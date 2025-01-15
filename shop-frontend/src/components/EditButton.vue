<template>
  <button class="btn btn-warning" @click="editProduct">Edit</button>
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
    editProduct() {
      console.log(`Editing product with ID: ${this.productId}`);
      // Tutaj możesz dodać logikę edycji produktu, np. otwarcie formularza edycji
    },
  },
};
</script>

<style>
button {
  margin-left: 10px;
}
</style>
