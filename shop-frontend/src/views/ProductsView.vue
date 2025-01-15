<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Product Table</h1>
    <div v-if="!hasAccess" class="alert alert-danger text-center">
      You must be logged in to view this page.
      <br />
      <router-link to="/login" class="btn btn-primary mt-3"
        >Go to Login</router-link
      >
    </div>
    <div v-else>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else>
        <ProductsTable :products="products" />
      </div>
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
    };
  },
  computed: {
    hasAccess() {
      return !!localStorage.getItem("token");
    },
  },
  async created() {
    if (!this.hasAccess) {
      this.loading = false;
      return;
    }
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
};
</script>

<style>
.container {
  margin-top: 20px;
}
</style>
