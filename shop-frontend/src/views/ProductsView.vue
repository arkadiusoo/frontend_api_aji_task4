<template>
  <div v-if="isLoggedIn" class="container mt-4">
    <div v-if="isClient" class="text-end mb-3">
      <router-link to="/cart" class="btn btn-primary">Go to Cart</router-link>
    </div>
    <h1 class="text-center mb-4">Product Table</h1>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else>
      <AddProductButton :isWorker="isWorker" @productAdded="fetchProducts" />
      <div v-if="products.length === 0" class="text-center mt-5">
        <InitialProductsButton
          v-if="isWorker"
          @openModal="showFileUploadModal"
        />
        <p v-else>No products available.</p>
      </div>
      <div v-else>
        <ProductsTable
          :products="products"
          :isClient="isClient"
          :isWorker="isWorker"
        />
      </div>
    </div>
    <FileUploadModal
      v-if="isFileUploadModalVisible"
      @close="closeFileUploadModal"
      @productsInitialized="fetchProducts"
    />
  </div>
  <div v-else class="text-center">
    <p>Please log in to access the content.</p>
    <router-link to="/login" class="btn btn-primary">Login</router-link>
  </div>
</template>

<script>
import ProductsTable from "../components/ProductsTable.vue";
import AddProductButton from "../components/AddProductButton.vue";
import InitialProductsButton from "../components/InitialProductsButton.vue";
import FileUploadModal from "../components/FileUploadModal.vue";
import { getProducts } from "../api";

export default {
  components: {
    ProductsTable,
    AddProductButton,
    InitialProductsButton,
    FileUploadModal,
  },
  data() {
    return {
      products: [],
      loading: true,
      error: null,
      isClient: false,
      isWorker: false,
      isLoggedIn: !!localStorage.getItem("token"),
      isFileUploadModalVisible: false,
    };
  },
  async created() {
    if (!this.isLoggedIn) {
      return;
    }
    await this.fetchProducts();

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
    showFileUploadModal() {
      this.isFileUploadModalVisible = true;
    },
    closeFileUploadModal() {
      this.isFileUploadModalVisible = false;
    },
  },
};
</script>

<style>
.container {
  margin-top: 20px;
}
</style>
