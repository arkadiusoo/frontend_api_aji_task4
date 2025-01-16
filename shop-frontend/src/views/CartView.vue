<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Your Cart</h1>
    <div v-if="cart.length === 0" class="text-center">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.price_unit }} USD</td>
            <td>{{ item.quantity }}</td>
            <td>
              <button class="btn btn-danger" @click="removeFromCart(item.id)">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
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
