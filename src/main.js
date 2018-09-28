import Vue from 'vue';
import firebase from 'firebase';
import VModal from 'vue-js-modal';
import dotenv from 'dotenv';

import App from './App.vue';
import router from './router';
import store from './store';
import config from './config/firebase';

dotenv.config();

Vue.config.productionTip = false;
Vue.use(VModal);

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.database();
const dbRef = db.ref('users');
Vue.prototype.$firebaseRef = dbRef;

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
