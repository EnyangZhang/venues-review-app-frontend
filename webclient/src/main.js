import Vue from 'vue';
import App from './App.vue';
import Home from './Home.vue';
import Venues from './Venues.vue';
import Venue from './Venue.vue';
import Myvenues from './Myvenues.vue';
import Myvenuemodify from './Myvenuemodify.vue';

import VueGeolocation from 'vue-browser-geolocation';
Vue.use(VueGeolocation);

import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import locale from 'iview/dist/locale/en-US';
Vue.use(iView, { locale });

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueResource from  'vue-resource'
Vue.use(VueResource);

Vue.http.options.emulateJSON = false;

Vue.use(iView);


const routes = [
  {
    path:"/",
    name: "home",
    component: Home
  },
  {
    path:"/venues",
    name:"venues",
    component:Venues
  },
  {
    path:"/venues/:venueId",
    name:"venue",
    component:Venue
  },
  {
    path: "/myvenues",
    name:'myvenues',
    component: Myvenues
  },
  {
    path:"/myvenues/:venueId",
    name:'myvenue',
    component:Myvenuemodify
  }
  ];

const router = new VueRouter({
  routes:routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
});
