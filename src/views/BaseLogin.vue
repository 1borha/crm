<template>
    <ModalWindow>
        <div class="login">
            <Form name='form' @submit="submitHandler" :rules="submitHandler" :validation-schema="validationRules">
                <fieldset class="login__fieldset">
                    <legend class="login__header"><p>Логин</p></legend>
                    <div class="login__content">
                        <Field class="login__input"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Введите ваш email"
                            v-model="userData.email" />

                        <Field class="login__input"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Введите ваш пароль"
                            v-model="password" />

                        <div class="errors">
                            <ErrorMessage class="error" name="email" />
                            <ErrorMessage class="error" name="password" />
                            <div class="error" v-if="submitError != ''">{{submitError}}</div>
                        </div>
                     </div>
                    <BaseButton class="login__button">Войти</BaseButton>
                </fieldset>
            </Form>
        </div>
    </ModalWindow>
</template>

<script lang='ts'>
import ModalWindow from '../components/ModalWindow.vue'
import BaseButton from '../components/BaseButton.vue'
import { defineComponent } from 'vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from '../store'
import { FirebaseError } from '@firebase/util'
const store = useStore()

export default defineComponent({
    name: 'BaseLogin',
    data () {
        const validationRules = yup.object({
            email: yup.string()
                .required('Поле email обязательное!')
                .email('Недействительный email.')
                .max(255, 'Email не должен превышать 256 символов.'),

            password: yup.string()
                .required('Поле пароль обязательное!')
                .min(6, 'Пароль дожен быть больше 6 символов.')
        })
        return {
            userData: {
                email: '',
                firstName: '',
                lastName: ''
            },
            password: '',
            validationRules,
            submitError: ''
        }
    },
    components: {
        Field,
        Form,
        ErrorMessage,
        ModalWindow,
        BaseButton
    },
    methods: {
        async submitHandler () {
            try {
                this.submitError = ''
                const userData = this.userData

                store.commit('setUser', userData)
                await store.dispatch('USER_SIGNIN', this.password)
                this.$router.push('/')
            } catch (e: unknown) {
                if (e instanceof FirebaseError) {
                    const err = e.code

                    switch (err) {
                        case 'auth/user-not-found' || 'auth/wrong-password' || 'auth/invalid-argument' : this.submitError = 'Неверный email или пароль.'; break
                        case 'auth/too-many-requests' : this.submitError = 'Слишком много попыток. Попробуйте позже.'; break
                        default: this.submitError = 'Неизвестная ошибка. Обратитесь в поддержку.'; break
                    }
                }
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.login {
    margin: 30px auto;
    padding: 25px 0;
    width: 50%;
    min-height: 40%;
    background-color: #F8F8F8;
    border-radius: 10px;
}

.login__fieldset {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.login__header p {
    margin: 30px 0;
    font-size: 48px;
}

.login__content {
    width: 50%;
}

.login__input {
    width: 100%;
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

.login__button {
    margin-top: 10px;
}

.errors {
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    align-items: start;
    line-height: 1.3;
}

.error {
    color: #FF2400;
}
</style>
