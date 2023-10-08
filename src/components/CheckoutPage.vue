<template>
  <div>
    <h2>Košarica</h2>
    <ul>
      <li v-for="(item, index) in cartItems" :key="index">
        <h3>{{ item.product.name }}</h3>
        <p>Cijena: {{ item.product.price }} kn</p>
        <p>Količina: {{ item.quantity }}</p>
        <button @click="removeFromCart(index)">Ukloni iz košarice</button>
      </li>
    </ul>
    <p>Ukupna cijena: {{ totalPrice }} kn</p>
  </div>
</template>

<script>
export default {
  props: {
    cartItems: Array,
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);
    }
  },
  methods: {
    removeFromCart(index) {
      this.$emit('remove-from-cart', index);
    }
  }
};
</script>

<style scoped>
/* Stilovi komponente CheckoutPage.vue */
</style>
