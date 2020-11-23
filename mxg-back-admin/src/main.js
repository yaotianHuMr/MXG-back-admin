import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 鉴权
// import '@/permission.js'
// 去除默认样式
import "./assets/reset.css";
//  配置element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// import './permission'


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
