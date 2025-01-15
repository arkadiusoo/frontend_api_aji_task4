<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Product Table</h1>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else>
      <table class="table table-bordered table-striped">
        <thead class="thead-dark">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Weight</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price_unit }} USD</td>
            <td>{{ product.weight_unit }} kg</td>
            <td>{{ product.category }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getProducts } from "../api";

export default {
  data() {
    return {
      products: [], // Lista produktów
      loading: true, // Flaga ładowania danych
      error: null, // Obsługa błędów
    };
  },
  async created() {
    try {
      const response = await getProducts(); // Pobranie produktów z API
      this.products = response.data;
    } catch (err) {
      console.error("Error fetching products:", err.message);
      this.error = "Failed to load products. Please try again later.";
    } finally {
      this.loading = false; // Zakończ ładowanie
    }
  },
};
</script>

<style>
.container {
  margin-top: 20px;
}
.table {
  margin-top: 20px;
}
</style>
