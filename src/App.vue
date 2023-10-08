<template>
  <div class="webshop-app">
   <center> <h1>Online katalog</h1> </center>

    <!-- Komponenta za dodavanje proizvoda -->
     <ProductList @add-to-cart="addToCart" />

    <!-- Prikaz košarice -->
    <!-- <router-link to="/checkout">Pregled košarice</router-link>  -->

    <router-view></router-view>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue';

export default {
  components: {
    ProductList,
  },
  data() {
    return {
      cartItems: [],
    };
  },
  methods: {
    addToCart(product) {
      const existingCartItem = this.cartItems.find(
        (item) => item.product.name === product.name
      );

      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        this.cartItems.push({ product: product, quantity: 1 });
      }
    }
  }
};
</script>

<style scoped>
.webshop-app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

</style>
