<template>
    <ModalWindow>
        <div class="register">
            <Form @submit="submitHandler" :validation-schema="validationRules">
                <fieldset class="register__fieldset">
                    <legend class="register__header"><p>Регистрация</p></legend>
                    <div class="register__content">
                        <Field class="register__input"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Введите ваш email"
                            v-model="email" />

                        <Field class="register__input"
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Введите ваше имя"
                            v-model="firstName" />

                        <Field class="register__input"
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Введите вашу фамилию"
                            v-model="lastName" />

                        <Field class="register__input"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Введите ваш пароль"
                            v-model="password" />

                        <Field class="register__input"
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Подтвердите ваш пароль"
                            v-model="confirmPassword" />

                        <div class="errors">
                            <ErrorMessage class="error" name="email" />
                            <ErrorMessage class="error" name="firstName" />
                            <ErrorMessage class="error" name="lastName" />
                            <ErrorMessage class="error" name="password" />
                            <ErrorMessage class="error" name="confirmPassword" />
                        </div>
                    </div>
                    <BaseButton class="register__button">Зарегистрироваться</BaseButton>
                </fieldset>
            </Form>
        </div>
    </ModalWindow>
</template>

<script lang='ts'>
import ModalWindow from '../components/ModalWindow.vue'
import BaseButton from '../components/BaseButton.vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { defineComponent } from 'vue'
// import { useStore } from '../store'
// const store = useStore()

export default defineComponent({
    name: 'BaseRegister',
    data () {
        const validationRules = yup.object({
            email: yup.string().required('Поле email обязательное!').email('Недействительный email').max(255, 'Email не должен превышать 256 символов.'),
            firstName: yup.string().required('Поле имя обязательное!').matches(/^([А-Я]{1}[а-яё]{1,23})$/gm, 'Некорректное имя.'),
            lastName: yup.string().required('Поле фамилия обязательное!').matches(/^([А-Я]{1}[а-яё]{1,23})$/gm, 'Некорректная фамилия.'),
            password: yup.string().required('Поле пароль обязательное!').min(6, 'Пароль дожен быть больше 6 символов'),
            confirmPassword: yup.string().required('Поле подтвердите пароль обязательное!').min(6, 'Пароль дожен быть больше 6 символов.').oneOf([yup.ref('password')], 'Пароли должны совпадать.')
        })

        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            validationRules
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
            console.log(this.email, this.firstName, this.lastName, this.password, this.confirmPassword)
            // try {
            //     const email = this.email
            //     const password = this.password
            //     store.commit('setEmail', email)
            //     store.commit('setPassword', password)
            //     await store.dispatch('USER_LOGIN', store.state.auth)
            //     this.$router.push('/')
            // } catch (e) {
            // }
        }
    }
})
</script>

<style lang="scss" scoped>
.register {
    margin: 30px auto;
    padding: 25px 0;
    width: 50%;
    min-height: 50%;
    background-color: #F8F8F8;
    border-radius: 10px;
}

.register__fieldset {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.register__header p {
    margin: 30px 0;
    font-size: 48px;
}

.register__content {
    width: 50%;
}

.register__input {
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

.register__button {
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
