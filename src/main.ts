import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/design-system.css'
import './assets/ds-page-bg-force.css'
import App from './App.vue'
import router from './router'
import { syncPageChromeBackground } from './design-system/sync-page-background'
import { injectElementPlusDesignTheme } from './design-system/theme/inject-element-plus-design-theme'

injectElementPlusDesignTheme()

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
syncPageChromeBackground()
