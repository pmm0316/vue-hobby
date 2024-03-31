/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare interface Window {
  VueCookies: any
}

declare module 'element-plus/dist/locale/zh-cn.mjs'