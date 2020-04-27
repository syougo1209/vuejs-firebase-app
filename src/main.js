import Vue from 'vue';
import App from './App.vue';
import firebase from 'firebase';
import store from "./store";
import EventHub from "./EventHub";
import router from "./router"

Vue.config.productionTip = false;
Vue.use(EventHub);



  // Your web app's Firebase configuration
   
  const config = {
    apiKey: "AIzaSyALVPRXq8kVsL-_EA7GR0-r-ktxYh8wvGc",
    authDomain: "refrigerator-htttp.firebaseapp.com",
    databaseURL: "https://refrigerator-htttp.firebaseio.com",
    projectId: "refrigerator-htttp",
    storageBucket: "refrigerator-htttp.appspot.com",
    messagingSenderId: "994766320174",
    appId: "1:994766320174:web:bdb77ce7ad0b8cacde65bf"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  
  
  new Vue({
      router,
      store,
  render: h => h(App),
}).$mount('#app')

