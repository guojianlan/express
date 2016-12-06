import Vue from 'vue';
import App from '../compoment/app.vue'
new Vue(Vue.util.extend({
  created(){
  	console.log(123);
  }
},App)).$mount('app');

