<template>
    <div class="deals">
        <Form name='form' @submit="submitHandler()" :rules="submitHandler" :validation-schema="validationRules">
            <fieldset class="deals__fieldset">
                <legend class="deals__header"><h2>Создать сделку</h2></legend>

                <CloseButton class="deals__close"/>

                <div class="deals__content">
                    <Field
                        class="deals__input"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Введите название сделки"
                        v-model.trim="deal.name" />

                    <Field
                        class="deals__input"
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Введите цену сделки"
                        v-model="deal.amount" />

                    <div class="deals__selects">
                        <Field name="status" as="select" class="deals__select" v-model="deal.status">
                            <option value="new">Новая</option>
                            <option value="presintations">Презентация</option>
                            <option value="negotiating">Переговоры</option>
                            <option value="end">Завершена</option>
                        </Field>

                        <Field name="result" as="select" class="deals__select" v-model="deal.result">
                            <option :disabled="(deal.status === 'end')" value="none"></option>
                            <option :disabled="(deal.status !== 'end')" value="win">Удачная</option>
                            <option :disabled="deal.status !== 'end'" value="lose">Неудачная</option>
                        </Field>
                    </div>

                    <div class="errors">
                        <ErrorMessage class="error" name="name" />
                        <ErrorMessage class="error" name="amount" />
                        <ErrorMessage class="error" name="status" />
                        <div class="error" v-if="submitError">{{submitError}}</div>
                    </div>
                </div>
                <BaseButton type="submit" class="deals__button">Создать</BaseButton>
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
    name: 'CreateDeals',
    components: {
        BaseButton,
        CloseButton,
        Field,
        ErrorMessage,
        Form
    },
    data () {
        const validationRules = yup.object({
            name: yup.string()
                .required('Поле название обязательное!'),

            amount: yup.number()
                .typeError('Значение должно быть числом')
                .required('Поле значение обязательное!'),

            status: yup.string()
                .required('Поле статус обязательное!')
        })

        return {
            deal: {
                id: '',
                amountCurrency: 'ru',
                date: '',
                creator: '',
                name: '',
                amount: 0,
                status: 'new',
                result: 'none'
            },
            submitError: '',
            validationRules
        }
    },
    methods: {
        async submitHandler () {
            try {
                this.submitError = ''
                const data = this.deal
                data.creator = this.$store.state.auth.user.firstName + ' ' + this.$store.state.auth.user.lastName

                if (data.status !== 'end') {
                    data.result = 'none'
                } else if (data.status === 'end' && data.result === 'none') {
                    this.submitError = 'Выберите результат!'
                    return
                }

                await this.$store.dispatch('ADD_DEAL', data)
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
.deals {
    margin: 30px auto;
    padding: 25px 0;
    position: relative;
    width: 50%;
    min-height: 50%;
    background-color: #F8F8F8;
    border-radius: 10px;
}

.deals__fieldset {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.deals__header h2 {
    margin: 30px 0;
    font-size: 48px;
}

.deals__close {
    position: absolute;
    top: 40px;
    right: 40px;
    z-index: 30;
}

.deals__content {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.deals__input, .deals__select {
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

.deals__selects {
    display: flex;
    justify-content: space-between
}

.deals__select {
    width: 45%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url('@/assets/images/particles/down-arrow.svg');
    background-size: 10%;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: calc(100% - 10px);
}

.deals__button {
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
