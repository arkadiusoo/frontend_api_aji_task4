<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Product Table</h1>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else>
      <AddProductButton :isWorker="isWorker" @productAdded="fetchProducts" />
      <ProductsTable
        :products="products"
        :isClient="isClient"
        :isWorker="isWorker"
      />
    </div>
  </div>
</template>

<script>
import ProductsTable from "../components/ProductsTable.vue";
import AddProductButton from "../components/AddProductButton.vue";
import { getProducts } from "../api";

export default {
  components: {
    ProductsTable,
    AddProductButton,
  },
  data() {
    return {
      products: [],
      loading: true,
      error: null,
      isClient: false,
      isWorker: false,
    };
  },
  async created() {
    await this.fetchProducts();

    // Pobierz rolę użytkownika z localStorage
    const userRole = localStorage.getItem("role");
    this.isClient = userRole === "CLIENT";
    this.isWorker = userRole === "WORKER";
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await getProducts();
        this.products = response.data;
      } catch (err) {
        console.error("Error fetching products:", err.message);
        this.error = "Failed to load products. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.container {
  margin-top: 20px;
}
</style>
