<template>
  <button class="btn btn-success" @click="buyProduct">Buy</button>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    buyProduct() {
      const username = localStorage.getItem("username");
      if (!username) {
        console.error("User isn't logged in!");
        return;
      }

      const cartKey = `cart_${username}`;
      const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
      const existingItem = cart.find((item) => item.id === this.product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: this.product.id,
          name: this.product.name,
          price_unit: this.product.price_unit,
          quantity: 1,
        });
      }

      localStorage.setItem(cartKey, JSON.stringify(cart));
      console.log(`Added to cart for user ${username}: ${this.product.name}`);
    },
  },
};
</script>

<style>
button {
  margin-left: 10px;
}
</style>
