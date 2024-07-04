import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import { jsPDF } from "jspdf";
// import Vue3SimpleHtml2pdf from "vue3-simple-html2pdf";

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import Notifications from '@kyvg/vue3-notification'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  })
const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
// app.use(Vue3SimpleHtml2pdf)
app.use(Notifications)
app.use(vuetify)

app.mount('#app')
