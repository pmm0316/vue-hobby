import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import "cesium/Build/Cesium/Widgets/widgets.css";
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
