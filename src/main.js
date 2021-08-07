import Vue from 'vue'
// import ElementUI from 'element-ui';

import {
  Container,
  Aside,
  Main,
  Button,
  Dialog,
  Checkbox,
  Progress
} from 'element-ui';

Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Checkbox);
Vue.use(Progress);

import 'element-ui/lib/theme-chalk/index.css';
import './assets/pl.css';
import App from './views/mobile/App.vue'
import router from './router'
import './plugins/element.js'
// import store from './store'

window._isSignIn = false; // 全局变量

Vue.config.productionTip = false
// Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
