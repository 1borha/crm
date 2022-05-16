<template>
    <header>Профиль</header>
    <div class="profile">
        <Form name='form' @submit="submitHandler" :rules="submitHandler" :validation-schema="validationRules">
                <fieldset class="profile__fieldset">
                    <div class="profile__content">
                        <Field class="profile__input"
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Новое имя"
                            v-model.trim="userData.firstName" />
                        <ErrorMessage class="error" name="firstName" />

                        <Field class="profile__input"
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Новая фамилия"
                            v-model.trim="userData.lastName" />
                        <ErrorMessage class="error" name="lastName" />

                        <Field class="profile__input"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Пароль"
                            v-model="credential.password" />
                        <ErrorMessage class="error" name="password" />

                        <Field class="profile__input"
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            placeholder="Новый пароль"
                            v-model="credential.newPassword" />
                        <ErrorMessage class="error" name="newPassword" />
                    </div>
                    <BaseButton class="profile__button">Сохранить изменения</BaseButton>
                    <div class="error" v-if="submitError != ''">{{submitError}}</div>
                </fieldset>
            </Form>
    </div>
</template>

<script lang='ts'>
import BaseButton from '../components/BaseButton.vue'
import { defineComponent } from 'vue'
import { Field, Form, ErrorMessage, configure } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from '../store'
import { FirebaseError } from '@firebase/util'
const store = useStore()

configure({
  validateOnBlur: false, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true // controls if `update:modelValue` events should trigger validation with `handleChange` handler
})

export default defineComponent({
    name: 'BaseProfile',
    data () {
        const validationRules = yup.object({
            firstName: yup.string()
                .matches(/^([А-Я]{1}[а-яё]{1,23})$/gm, 'Некорректное имя.')
                .transform(v => v === '' ? null : v)
                .nullable(),

            lastName: yup.string()
                .matches(/^([А-Я]{1}[а-яё]{1,23})$/gm, 'Некорректная фамилия.')
                .transform(v => v === '' ? null : v)
                .nullable(),

            password: yup.string()
                .min(6, 'Пароль дожен быть больше 6 символов.')
                .transform(v => v === '' ? null : v)
                .nullable(),

            newPassword: yup.string()
                .min(6, 'Пароль дожен быть больше 6 символов.')
                .transform(v => v === '' ? null : v)
                .nullable()
        })

        return {
            userData: {
                firstName: '',
                lastName: ''
            },
            credential: {
                password: '',
                newPassword: ''
            },
            submitError: '',
            validationRules
        }
    },
    components: {
        BaseButton,
        Form,
        Field,
        ErrorMessage
    },
    methods: {
        async submitHandler () {
            if (this.userData.firstName !== '') {
                try {
                    await store.dispatch('CHANGE_FIRSTNAME', this.userData.firstName)
                } catch (e: unknown) {
                    if (e instanceof FirebaseError) {
                        const err = e.code

                        switch (err) {
                            case 'auth/invalid-argument' : this.submitError = 'Недопустимое значение'; break
                            default: this.submitError = 'Неизвестная ошибка. Обратитесь в поддержку.'; break
                        }
                    }
                }
            }
            if (this.userData.lastName !== '') {
                try {
                    await store.dispatch('CHANGE_LASTNAME', this.userData.lastName)
                } catch (e: unknown) {
                    if (e instanceof FirebaseError) {
                        const err = e.code

                        switch (err) {
                            case 'auth/invalid-argument' : this.submitError = 'Недопустимое значение'; break
                            default: this.submitError = 'Неизвестная ошибка. Обратитесь в поддержку.'; break
                        }
                    }
                }
            }
            if (this.credential.newPassword) {
                try {
                    await store.dispatch('CHANGE_PASSWORD', this.credential)
                } catch (e: unknown) {
                    if (e instanceof FirebaseError) {
                        const err = e.code

                        switch (err) {
                            case 'auth/wrong-password' : this.submitError = 'Неверный пароль'; break
                            case 'auth/invalid-password' : this.submitError = 'Недопустимый пароль'; break
                            default: this.submitError = 'Неизвестная ошибка. Обратитесь в поддержку.'; break
                        }
                    }
                }
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.profile__input {
    display: block;
    width: 30%;
    margin: 30px;
    padding: 15px;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #5B6AD0;
    &:focus {
        box-shadow: 0 0 10px #E2E6FF;
    }
}

.profile__button {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 35px;
}

.error {
    margin-left: 15px;
    color: #FF2400;
}
</style>
