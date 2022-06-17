<template>
    <div class="login">
        <Form name='form' @submit="submitHandler()" :rules="submitHandler" :validation-schema="validationRules">
            <fieldset class="login__fieldset">
                <legend class="login__header"><h2>Логин</h2></legend>
                <div class="login__content">
                    <Field class="login__input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Введите ваш email"
                        v-model.trim="userData.email" />

                    <Field class="login__input"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Введите ваш пароль"
                        v-model="password"
                        autocomplete="on" />

                    <div class="errors">
                        <ErrorMessage class="error" name="email" />
                        <ErrorMessage class="error" name="password" />
                        <div class="error" v-if="submitError != ''">{{submitError}}</div>
                    </div>
                </div>
                <BaseButton class="login__button">Войти</BaseButton>
                <router-link class="login__register" :to="{name: 'register'}">
                    Зарегистрироваться
                </router-link>
            </fieldset>
        </Form>
    </div>
</template>

<script lang='ts'>
import BaseButton from '@/components/BaseButton.vue'
import { defineComponent } from 'vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { FirebaseError } from '@firebase/util'

export default defineComponent({
    name: 'BaseLogin',
    components: {
        Field,
        Form,
        ErrorMessage,
        BaseButton
    },
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
    methods: {
        async submitHandler () {
            try {
                this.submitError = ''

                const userData = this.userData
                const password = this.password
                const user = {
                    userData,
                    password
                }

                await this.$store.dispatch('USER_SIGNIN', user)
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
    position: relative;
    margin: 30px auto;
    padding: 25px 0;
    width: 50%;
    min-height: 30%;
    background-color: #F8F8F8;
    border-radius: 10px;
}

.login__fieldset {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.login__header h2 {
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
    margin-bottom: 30px;
}

.login__register {
    position: absolute;
    left: 50%;
    bottom: 15px;
    transform: translateX(-50%);
    color: #5B6AD0;
    &:active {
        color: #2B3AA0;
    }
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
