<template>
    <div class="deal">
        <CloseButton class="deal__close" />
        <Form name='form' @submit="submitHandler" :rules="submitHandler" :validation-schema="validationRules">
            <fieldset class="deal__fieldset">
                <legend class="deal__header"><p>Изменить сделку</p></legend>
                <div class="deal__content">
                    <Field name="name" v-slot="{field}" v-model="name">
                        <input class="deal__input" v-bind="field" type="text">
                    </Field>

                    <Field name="amount" v-slot="{field}" v-model="amount">
                        <input class="deal__input" v-bind="field" type="text">
                    </Field>

                    <div class="deal__selects">
                        <Field class="deal__select" name="status" as="select" v-model="status">
                            <option value="new">Новая</option>
                            <option value="presintations">Презентация</option>
                            <option value="negotiating">Переговоры</option>
                            <option value="end">Завершена</option>
                        </Field>

                        <Field class="deal__select" name="result" as="select" v-model="result">
                            <option :disabled="(status === 'end')" value="none"></option>
                            <option :disabled="(status !== 'end')" value="win">Удачная</option>
                            <option :disabled="status !== 'end'" value="lose">Неудачная</option>
                        </Field>
                    </div>

                    <div class="errors">
                        <ErrorMessage class="error" name="name" />
                        <ErrorMessage class="error" name="amount" />
                        <ErrorMessage class="error" name="status" />
                        <div class="error" v-if="submitError">{{submitError}}</div>
                    </div>
                </div>
                <BaseButton class="deal__button" style="background-color: #00CC00" type="submit">Сохранить изменения</BaseButton>
                <BaseButton class="deal__button" style="background-color: #CC0000" @click="deleteBtn()">Архивировать сделку</BaseButton>
            </fieldset>
        </Form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CloseButton from '@/components/CloseButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { FirebaseError } from '@firebase/util'

export default defineComponent({
    name: 'CardDeals',
    components: {
        CloseButton,
        BaseButton,
        Form,
        Field,
        ErrorMessage
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
            submitError: '',
            id: '',
            dealData: {},
            name: '',
            amount: '',
            status: '',
            result: '',
            validationRules
        }
    },
    methods: {
        deleteBtn () {
            this.$store.dispatch('ARCHIVE_DEAL', this.id)
            this.$router.go(-1)
        },

        async submitHandler () {
            try {
                this.submitError = ''
                const data = {
                    id: this.id,
                    name: this.name,
                    amount: this.amount,
                    status: this.status,
                    result: this.result
                }

                if (data.status !== 'end') {
                    data.result = 'none'
                } else if (data.status === 'end' && data.result === 'none') {
                    this.submitError = 'Выберите результат!'
                    return
                }

                await this.$store.dispatch('CHANGE_DEAL', data)
            } catch (e: unknown) {
                if (e instanceof FirebaseError) {
                    this.submitError = e.code
                }
            }
        }
    },
    async mounted () {
        await this.$store.dispatch('GET_DEALS', 'deals init')
        const id = (this.$route.params.id).toString()
        this.id = id
        const dealData = this.$store.getters.getDeal(id)[0]

        this.dealData = dealData
        this.name = dealData.name
        this.amount = dealData.amount.toString()
        this.status = dealData.status
        this.result = dealData.result
    }
})
</script>

<style lang="scss" scoped>
.deal {
    margin: 30px auto;
    padding: 25px 0;
    position: relative;
    width: 50%;
    min-height: 40%;
    background-color: #F8F8F8;
    border-radius: 10px;
}

.deal__fieldset {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.deal__header p {
    margin: 30px 0;
    font-size: 48px;
}

.deal__close {
    position: absolute;
    top: 40px;
    right: 40px;
    z-index: 30;
}

.deal__content {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.deal__input, .deal__select {
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

.deal__selects {
    display: flex;
    justify-content: space-between
}

.deal__select {
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

.deal__button {
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
