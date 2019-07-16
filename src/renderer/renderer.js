console.log('Heya, this is coming from a webpack bundle');
import Vue from 'vue';
import App from './App.vue';

const isDev = process.env.NODE_ENV === 'development'

Vue.config.devtools = isDev;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
