<template>
    <div class="companies">
        <Form name='form' @submit="submitHandler()" :rules="submitHandler" :validation-schema="validationRules">
            <fieldset class="companies__fieldset">
                <legend class="companies__header"><h2>Добавить компанию</h2></legend>

                <CloseButton class="companies__close"/>

                <div class="companies__content">
                    <Field
                        class="companies__input"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Введите название компании"
                        v-model.trim="company.name" />

                    <Field
                        class="companies__input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Введите email"
                        v-model="company.email" />

                    <Field
                        class="companies__input"
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Введите номер телефона"
                        v-model="company.phone" />

                    <select class="companies__select" v-model="company.lifeStage">
                        <option value="Инициация">Инициация</option>
                        <option value="Планирование">Планирование</option>
                        <option value="Выполнение">Выполнение</option>
                        <option value="Завершение">Завершение</option>
                    </select>

                    <Field
                        class="companies__input"
                        type="text"
                        name="owner"
                        id="owner"
                        placeholder="Введите ФИ владельца"
                        v-model="company.owner" />

                    <div class="errors">
                        <ErrorMessage class="error" name="name" />
                        <ErrorMessage class="error" name="email" />
                        <ErrorMessage class="error" name="phone" />
                        <ErrorMessage class="error" name="owner" />
                        <div v-if="submitError">{{submitError}}</div>
                    </div>
                </div>
                <BaseButton type="submit" class="companies__button">Создать</BaseButton>
            </fieldset>
        </Form>
    </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import CloseButton from '@/components/CloseButton.vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { defineComponent } from 'vue'
import { FirebaseError } from '@firebase/util'

export default defineComponent({
    name: 'CreateCompanies',
    components: {
        BaseButton,
        CloseButton,
        Form,
        Field,
        ErrorMessage
    },
    data () {
        const validationRules = yup.object({
            name: yup.string()
                .required('Поле название обязательное!'),

            email: yup.string()
                .required('Поле email обязательное!')
                .email('Недействительный email.')
                .max(255, 'Email не должен превышать 256 символов.'),

            phone: yup.string()
                .required('Поле номер обязательное!')
                .matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g, 'Неверная запись номера телефона'),

            owner: yup.string()
                .required('Поле владелец обязательное!')
                .matches(/^([А-Я]{1}[а-яё]{1,23})+\s([А-Я]{1}[а-яё]{1,23})$/gm, 'Некорректная запись ФИ')
        })

        return {
            company: {
                name: '',
                email: '',
                phone: '',
                lifeStage: 'Инициация',
                owner: '',
                createdAt: '',
                projects: []
            },
            submitError: '',
            validationRules
        }
    },
    methods: {
        async submitHandler () {
            try {
                this.submitError = ''
                const data = this.company

                await this.$store.dispatch('ADD_COMPANY', data)
            } catch (e: unknown) {
                if (e instanceof FirebaseError) {
                    this.submitError = e.code
                }
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.companies {
    margin: 30px auto;
    padding: 25px 0;
    position: relative;
    width: 50%;
    min-height: 50%;
    background-color: #F8F8F8;
    border-radius: 10px;
}

.companies__fieldset {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.companies__header h2 {
    margin: 30px 0;
    font-size: 48px;
}

.companies__close {
    position: absolute;
    top: 40px;
    right: 40px;
    z-index: 30;
}

.companies__content {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.companies__input, .companies__select {
    max-width: 100%;
    margin-bottom: 20px;
    padding: 15px;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #5B6AD0;
    border-radius: 30px;
    &:focus {
        box-shadow: 0 0 10px #E2E6FF;
    }
}

.companies__select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url('@/assets/images/particles/down-arrow.svg');
    background-size: 5%;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: calc(100% - 15px);
}

.companies__button {
    margin-top: 10px;
}

.errors {
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.3;
}

.error {
    color: #FF2400;
}
</style>
