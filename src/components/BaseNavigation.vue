<template>
    <nav class="nav">
        <header class="profile">
            <div class="profile__item">
                <img class="profile__image" src="../assets/images/default_profile_image.svg" width="40px" height="40px">
            </div>
            <div class="profile__item">
                <p class="profile__welcome">Здравствуйте,</p>
                <p class="profile__user" >{{$store.getters.firstName}}</p>
            </div>
            <div class="profile__item">
                <router-link :to="{name: 'profile'}">
                    <button class="profile__button"></button>
                </router-link>
            </div>
        </header>
        <main>
            <ul class="nav__content">
                <router-link :to="{name: 'home'}">
                    <li class="nav__item">
                        <Icon icon="ion:newspaper"
                            color="#757d8a"
                            width="16"
                            height="16"
                            :inline="true" />
                        Лента активности</li>
                </router-link>
                <router-link :to="{name: 'tasks'}">
                <li class="nav__item">
                    <Icon icon="ion:clipboard"
                        color="#757d8a"
                        width="16"
                        height="16"
                        :inline="true" />
                    Задачи</li>
                </router-link>
                <router-link :to="{name: 'crm'}">
                <li class="nav__item">
                    <Icon icon="ion:logo-usd"
                        color="#757d8a"
                        width="16"
                        height="16"
                        :inline="true" />
                    CRM</li>
                    </router-link>
                <ul>
                    <router-link :to="{name: 'deals'}">
                        <li class="nav__item">Сделки</li>
                    </router-link>
                    <li class="nav__item">Компании</li>
                    <li class="nav__item">Контакты</li>
                    <li class="nav__item">Архивные сделки</li>
                </ul>
                <li class="nav__item">
                    <Icon icon="ion:file-tray-full"
                        color="#757d8a"
                        width="16"
                        height="16"
                        :inline="true" />
                    Проекты</li>
                <li class="nav__item">
                    <Icon icon="ion:wallet"
                        color="#757d8a"
                        width="16"
                        height="16"
                        :inline="true" />
                    Финансы</li>
                <li class="nav__item">
                    <Icon icon="ion:people"
                        color="#757d8a"
                        width="16"
                        height="16"
                        :inline="true" />
                    Команда</li>
            </ul>
        </main>
        <footer>
            <ul class="nav__footer">
                <li class="nav__item">
                    <Icon icon="ion:shield-checkmark"
                        color="#757d8a"
                        width="16"
                        height="16"
                        :inline="true" />
                    Поддержка</li>
                <li class="nav__item" @click="signOut()">
                    <Icon icon="ion:power"
                        color="#757d8a"
                        width="16"
                        height="16"
                        :inline="true" />
                    Выход</li>
            </ul>
        </footer>
    </nav>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue'
import { useStore } from '../store'
import { defineComponent } from 'vue'
const store = useStore()
export default defineComponent({
    components: {
		Icon
	},
    name: 'BaseNavigation',
    methods: {
        async signOut () {
            await store.dispatch('USER_SIGNOUT', 'Bye')
            this.$router.push('/login')
        }
    }
})
</script>

<style lang="scss" scoped>
.nav {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    height: 100%;
    width: 250px;
    background-color: #F1F2F6;
}

/* Profile block */
@import "../assets/styles/profile.scss";

/* Nav content block */
.nav__item {
    margin: 10px 20px;
    padding: 10px 15px;
    font-size: 14px;
    color: #757D8A;
    &:hover {
        cursor: pointer;
        background-color: #E0E0E0;
    }
    & svg {
        margin-right: 10px;
    }
}
/* Nav footer block */
.nav__footer {
    position: absolute;
    bottom: 30px;
    width: 100%;
}
</style>
