import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'

import PageLayout from './layouts/PageLayout.vue'
import ModuleLayout from './layouts/ModuleLayout.vue'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/database'

firebase.initializeApp({
    apiKey: 'AIzaSyBiaxXR_rm_BQujVecPn1srPZMzppySw5c',
    authDomain: 'vuets-crm.firebaseapp.com',
    databaseURL: 'https://vuets-crm-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'vuets-crm',
    storageBucket: 'vuets-crm.appspot.com',
    messagingSenderId: '974369038749',
    appId: '1:974369038749:web:5c055417b44acbc9d6cf74'
})

let app : unknown

firebase.auth().onAuthStateChanged((user) => {
    store.dispatch('AUTO_USER_SIGNIN', user)
    store.commit('setIsAuth', true)
    if (!app) {
        createApp(App)
        .component('page-layout', PageLayout)
        .component('module-layout', ModuleLayout)
        .use(store)
        .use(router)
        .mount('#app')
    }
})
