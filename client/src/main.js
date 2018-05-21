import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FBSignInButton from 'vue-facebook-signin-button'

Vue.use(FBSignInButton)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
