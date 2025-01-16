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
          <th v-if="isClient || isWorker">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price_unit }} USD</td>
          <td>{{ product.weight_unit }} kg</td>
          <td>{{ product.category }}</td>
          <td v-if="isClient || isWorker">
            <BuyButton v-if="isClient" :productId="product.id" />
            <EditButton
              v-if="isWorker"
              :productId="product.id"
              :product="product"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BuyButton from "./BuyButton.vue";
import EditButton from "./EditButton.vue";

export default {
  components: {
    BuyButton,
    EditButton,
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
    isWorker: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style>
.table {
  margin-top: 20px;
}
</style>
