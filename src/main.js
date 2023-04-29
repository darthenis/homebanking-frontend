import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/routes.js'
import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'


createApp(App)
        .use(Vue3Lottie)
        .use(router)
        .mount('#app')
