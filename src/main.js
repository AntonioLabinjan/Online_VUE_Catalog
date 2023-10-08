import { createApp } from 'vue';
import App from './App.vue';
// import { createRouter, createWebHistory } from 'vue-router';

// Import komponenata koje ćete koristiti u rutama
// import ProductList from './components/ProductList.vue';
//import CheckoutPage from './components/CheckoutPage.vue';

//const routes = [
 // { path: '/', component: ProductList },
  //{ path: '/checkout', component: CheckoutPage } // Dodali smo rutu za CheckoutPage
// ];

// const router = createRouter({
//  history: createWebHistory(),
//  routes
//});

const app = createApp(App);
// app.use(router);

app.mount('#app');
