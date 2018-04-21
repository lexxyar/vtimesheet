// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'
import Alert from './components/Alert.vue'
import Message from "./components/Message.vue"
// import FileUploadService from 'v-file-upload'

Vue.config.productionTip = false

Vue.use(resource);
Vue.component("Alert",Alert);
Vue.component("Message", Message);

// Vue.use(FileUploadService);
/* eslint-disable no-new */
new Vue({
  router,
  components: {App},
  template: '<App />'
}).$mount('#app');
