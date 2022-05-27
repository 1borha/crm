<template>
    <div class="register">
        <Form name='form' @submit="submitHandler" :rules="submitHandler" :validation-schema="validationRules">
            <fieldset class="register__fieldset">
                <legend class="register__header"><p>Регистрация</p></legend>
                <div class="register__content">
                    <Field class="register__input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Введите ваш email"
                        v-model.trim="userData.email" />

                    <Field class="register__input"
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Введите ваше имя"
                        v-model.trim="userData.firstName" />

                    <Field class="register__input"
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Введите вашу фамилию"
                        v-model.trim="userData.lastName" />

                    <select class="register__select" v-model="userData.role">
                        <option value="Менеджер информационных систем">Менеджер информационных систем</option>
                        <option value="IT специалист">IT специалист</option>
                        <option value="Администратор">Администратор</option>
                        <option value="Директор по маркетингу">Директор по маркетингу</option>
                        <option value="Менеджер по работе с клиентами">Менеджер по работе с клиентами</option>
                        <option value="Директор по развитию отношений с клиентами">Директор по развитию отношений с клиентами</option>
                        <option value="Бухгалтер">Бухгалтер</option>
                        <option value="Главный исполнительный директор">Главный исполнительный директор</option>
                    </select>

                    <select class="register__select" v-model="userData.status">
                        <option value="Начальный уровень">Начальный уровень</option>
                        <option value="Средний уровень">Средний уровень</option>
                        <option value="Высокий уровень">Высокий уровень</option>
                        <option value="Продвинутый уровень">Продвинутый уровень</option>
                        <option value="Экспертный уровень">Экспертный уровень</option>
                    </select>

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
                        <div class="error" v-if="submitError != ''">{{submitError}}</div>
                    </div>
                </div>
                <BaseButton type="submit" class="register__button">Зарегистрироваться</BaseButton>
            </fieldset>
        </Form>
    </div>
</template>

<script lang='ts'>
import BaseButton from '@/components/BaseButton.vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { defineComponent } from 'vue'
import { FirebaseError } from '@firebase/util'

export default defineComponent({
    name: 'BaseRegister',
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
                .email('Недействительный email')
                .max(255, 'Email не должен превышать 256 символов.'),

            firstName: yup.string()
                .required('Поле имя обязательное!')
                .matches(/^([А-Я]{1}[а-яё]{1,23})$/gm, 'Некорректное имя.'),

            lastName: yup.string()
                .required('Поле фамилия обязательное!')
                .matches(/^([А-Я]{1}[а-яё]{1,23})$/gm, 'Некорректная фамилия.'),

            password: yup.string()
                .required('Поле пароль обязательное!')
                .min(6, 'Пароль дожен быть больше 6 символов'),

            confirmPassword: yup.string()
                .required('Поле подтвердите пароль обязательное!')
                .min(6, 'Пароль дожен быть больше 6 символов.')
                .oneOf([yup.ref('password')], 'Пароли должны совпадать.')
        })

        return {
            userData: {
                email: '',
                firstName: '',
                lastName: '',
                role: '',
                status: ''
            },
            password: '',
            confirmPassword: '',
            submitError: '',
            validationRules
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

                await this.$store.dispatch('USER_REGISTER', user)
                this.$router.push('/')
            } catch (e: unknown) {
                if (e instanceof FirebaseError) {
                    const err = e.code
                    switch (err) {
                        case 'auth/email-already-in-use' : this.submitError = 'Email занят'; break
                        case 'auth/invalid-argument' : this.submitError = 'Недопустимый аргумент'; break
                        case 'auth/invalid-email' : this.submitError = 'Недопустимый email'; break
                        case 'auth/invalid-password' : this.submitError = 'Недопустимый пароль'; break
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.register__input, .register__select {
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

.register__select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url('../assets/images/particles/down-arrow.svg');
    background-size: 5%;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: calc(100% - 15px);
}

.register__button {
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
