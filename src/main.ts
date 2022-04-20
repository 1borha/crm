import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

firebase.initializeApp({
    apiKey: 'AIzaSyBiaxXR_rm_BQujVecPn1srPZMzppySw5c',
    authDomain: 'vuets-crm.firebaseapp.com',
    projectId: 'vuets-crm',
    storageBucket: 'vuets-crm.appspot.com',
    messagingSenderId: '974369038749',
    appId: '1:974369038749:web:5c055417b44acbc9d6cf74'
})

let app : unknown

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        createApp(App)
        .use(store)
        .use(router)
        .mount('#app')
    }
})
