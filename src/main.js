import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'


import App from './App.vue'
import router from './router'

//引入初始化的样式文件
import '@/styles/common.scss'
//引入懒加载指令插件并注册
import { lazyPlugin } from './directives'
//引入全局注册组件插件
import { componentPlugin } from './components'


const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
pinia.use(createPersistedState)

app.mount('#app')

