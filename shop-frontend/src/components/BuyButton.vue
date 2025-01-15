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
  },
  methods: {
    buyProduct() {
      console.log(`Buying product with ID: ${this.productId}`);
      // Tutaj możesz dodać logikę zakupu produktu
    },
  },
};
</script>

<style>
button {
  margin-left: 10px;
}
</style>
