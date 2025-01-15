<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Product Table</h1>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else>
      <ProductsTable :products="products" :isClient="isClient" />
    </div>
  </div>
</template>

<script>
import ProductsTable from "../components/ProductsTable.vue";
import { getProducts } from "../api";

export default {
  components: {
    ProductsTable,
  },
  data() {
    return {
      products: [],
      loading: true,
      error: null,
      isClient: false, // Flaga roli użytkownika
    };
  },
  async created() {
    try {
      const response = await getProducts();
      this.products = response.data;

      // Ustawienie roli użytkownika na podstawie localStorage
      const userRole = localStorage.getItem("role");
      console.log(userRole); // Zakładam, że rola jest przechowywana w localStorage
      this.isClient = userRole === "CLIENT";
    } catch (err) {
      console.error("Error fetching products:", err.message);
      this.error = "Failed to load products. Please try again later.";
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style>
.container {
  margin-top: 20px;
}
</style>
