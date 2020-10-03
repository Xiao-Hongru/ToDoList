// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from "./App";

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import store from "./store";
Vue.config.productionTip=false;

Vue.use(Antd);

new Vue({
  render:h=>h(App),
  store
}).$mount('#app');
