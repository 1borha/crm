<template>
    <ModalWindow>
        <div class="login">
            <form>
                <fieldset class="login__fieldset">
                    <legend class="login__header"><p>Логин</p></legend>

                    <input class="login__input"
                        type="email"
                        id="email"
                        placeholder="Введите ваш email"
                        :value="email"
                        @input="event => email = event.target.value">
                    <input class="login__input"
                        type="password"
                        id="password"
                        placeholder="Введите ваш пароль"
                        :value="password"
                        @input="event => password = event.target.value">

                    <BaseButton class="login__button" @click.prevent="submitHandler">Войти</BaseButton>
                </fieldset>
            </form>
        </div>
    </ModalWindow>
</template>

<script lang='ts'>
import ModalWindow from '../components/ModalWindow.vue'
import BaseButton from '../components/BaseButton.vue'
import { defineComponent } from 'vue'
import { useStore } from '../store'
const store = useStore()

export default defineComponent({
    name: 'BaseLogin',
    data () {
        return {
            email: '',
            password: ''
        }
    },
    components: {
        ModalWindow,
        BaseButton
    },
    methods: {
        async submitHandler () {
            try {
                const email = this.email
                const password = this.password
                store.commit('setEmail', email)
                store.commit('setPassword', password)
                await store.dispatch('USER_LOGIN', store.state.auth)
                this.$router.push('/')
            } catch (e) {
            }
        }
    },
    computed: {
    }
})
</script>

<style lang="scss">
.login {
    margin: 30px auto;
    width: 50%;
    height: 50%;
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

.login__input {
    width: 45%;
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
</style>
