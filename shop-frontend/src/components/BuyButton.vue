<template>
  <button class="btn btn-success" @click="buyProduct">Buy</button>
</template>

<script>
export default {
  props: {
    productId: {
      type: Number,
      required: true,
    },
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    buyProduct() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
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

      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(`Added to cart: ${this.product.name}`);
    },
  },
};
</script>

<style>
button {
  margin-left: 10px;
}
</style>
