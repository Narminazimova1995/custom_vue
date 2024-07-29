import { createStore } from 'vuex'
import auth from './auth'
import theme from './theme'


const store = createStore({ /* options */ })

store.registerModule('auth', auth)
store.registerModule('theme', theme)


export default store
