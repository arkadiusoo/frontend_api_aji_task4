<template>
  <div>
    <table class="table table-bordered table-striped">
      <thead class="thead-dark">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Weight</th>
          <th>Category</th>
          <th v-if="isClient">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price_unit }} USD</td>
          <td>{{ product.weight_unit }} kg</td>
          <td>{{ product.category }}</td>
          <td v-if="isClient">
            <BuyButton :productId="product.id" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BuyButton from "./BuyButton.vue";

export default {
  components: {
    BuyButton,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
    isClient: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style>
.table {
  margin-top: 20px;
}
</style>
