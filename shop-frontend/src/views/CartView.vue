<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Your Cart</h1>
    <div v-if="cart.length === 0" class="text-center">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <CartTable
        :cart="cart"
        @updateQuantity="updateQuantity"
        @removeFromCart="removeFromCart"
      />
    </div>
  </div>
</template>

<script>
import CartTable from "../components/CartTable.vue";

export default {
  components: {
    CartTable,
  },
  data() {
    return {
      cart: [],
    };
  },
  created() {
    const username = localStorage.getItem("username");
    if (!username) {
      console.error("User is not logged in!");
      this.cart = [];
      return;
    }

    const cartKey = `cart_${username}`;
    this.cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  },
  methods: {
    updateQuantity(productId, newQuantity) {
      const username = localStorage.getItem("username");
      const cartKey = `cart_${username}`;

      const product = this.cart.find((item) => item.id === productId);

      if (newQuantity >= 1) {
        product.quantity = Math.floor(newQuantity);
        localStorage.setItem(cartKey, JSON.stringify(this.cart));
      }
    },
    removeFromCart(productId) {
      const username = localStorage.getItem("username");
      const cartKey = `cart_${username}`;
      this.cart = this.cart.filter((item) => item.id !== productId);
      localStorage.setItem(cartKey, JSON.stringify(this.cart));
    },
  },
};
</script>

<style>
.container {
  margin-top: 20px;
}
</style>
