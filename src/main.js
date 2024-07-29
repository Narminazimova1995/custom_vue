import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import locale from 'element-plus/lib/locale/lang/en'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import moment from 'moment'

const app = createApp(App)
app.config.devtools = true
app.config.globalProperties.$moment = moment
app.use(router)
app.use(store)
app.use(ElementPlus, { locale })


app.mount('#app')
