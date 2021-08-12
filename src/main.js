import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//全局引入elememtUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//导入图标
//导入图标字体
import './assets/fonts/iconfont.css'

//导入全局样式
import './assets/css/global.css'


Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
