<template>
  <div v-if="isWorker">
    <button class="btn btn-success mb-3" @click="openModal">Add Product</button>
    <ProductModal
      :isVisible="isModalVisible"
      title="Add Product"
      :productData="{}"
      :isAdding="isAdding"
      @submit="handleAddProduct"
      @close="closeModal"
    />
    <ErrorModal v-if="error" :error="error" @clearError="clearError" />
  </div>
</template>

<script>
import ProductModal from "./ProductModal.vue";
import { createProduct } from "../api";
import ErrorModal from "../components/ErrorModal.vue";

export default {
  components: { ProductModal, ErrorModal },
  props: {
    isWorker: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isModalVisible: false,
      error: null,
      isAdding: true,
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async handleAddProduct(newProductData) {
      try {
        if (newProductData instanceof SubmitEvent) {
          return;
        }
        const response = await createProduct(newProductData);
        console.log("Product created:", response.data);
        if (response.status === 200) {
          window.location.reload();
        }
        this.closeModal();
      } catch (error) {
        console.error("Error creating product:", error.message);
        this.error =
          "Error creating product, check your input data. Error message: " +
          error.message;
      }
    },
    clearError() {
      this.error = null;
    },
  },
};
</script>

<style>
.btn-success {
  margin-bottom: 20px;
}
</style>
