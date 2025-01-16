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
            <td>
              {{
                item.quantity
                  ? (item.price_unit * item.quantity).toFixed(2)
                  : item.price_unit.toFixed(2)
              }}
              USD
            </td>
            <td>
              <div class="quantity-controls">
                <button
                  class="btn btn-secondary btn-sm"
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  :disabled="item.quantity <= 1"
                >
                  -
                </button>
                <input
                  type="text"
                  class="quantity"
                  v-model.number="item.quantity"
                  @change="handleQuantityChange(item)"
                  style="width: 50px; text-align: center"
                  onwheel="this.blur()"
                />
                <button
                  class="btn btn-secondary btn-sm"
                  @click="updateQuantity(item.id, item.quantity + 1)"
                >
                  +
                </button>
              </div>
            </td>

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
    updateQuantity(productId, newQuantity) {
      const username = localStorage.getItem("username");
      const cartKey = `cart_${username}`;

      const product = this.cart.find((item) => item.id === productId);

      if (product && newQuantity >= 1) {
        product.quantity = Math.floor(newQuantity); // Zaokrąglij do liczby całkowitej
        localStorage.setItem(cartKey, JSON.stringify(this.cart));
      }
    },
    handleQuantityChange(item) {
      if (!item.quantity || item.quantity < 1) {
        item.quantity = 1; // Minimalna wartość
      } else {
        item.quantity = Math.floor(item.quantity); // Zaokrąglij do liczby całkowitej
      }
      this.updateQuantity(item.id, item.quantity);
    },
  },
};
</script>

<style>
.container {
  margin-top: 20px;
}

.quantity-controls button {
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 10;
  margin: 0 10px;
}

.quantity {
  font-weight: bold;
}
</style>
