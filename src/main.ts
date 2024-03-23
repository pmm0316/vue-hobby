import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import './assets/main.css'
import router from './router'
import { gaodeKey } from './configData/gaode'
import VueCookies from 'vue-cookies';


// @ts-ignore
window._AMapSecurityConfig = {
  securityJsCode: gaodeKey,
};

const app = createApp(App)

app.use(router)
window.VueCookies = VueCookies
// app.use(VueCookies)

app.mount('#app')
