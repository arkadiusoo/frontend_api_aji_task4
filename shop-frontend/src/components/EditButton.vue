<template>
  <div>
    <button class="btn btn-warning" @click="openModal">Edit</button>
    <ProductModal
      :isVisible="isModalVisible"
      :productData="product"
      title="Edit Product"
      @submit="handleSubmit"
      @close="closeModal"
    />
    <ErrorModal v-if="error" :error="error" @clearError="clearError" />
  </div>
</template>

<script>
import ProductModal from "./ProductModal.vue";
import { updateProduct } from "../api";
import ErrorModal from "../components/ErrorModal.vue";

export default {
  components: { ProductModal, ErrorModal },
  props: {
    product: {
      type: Object,
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isModalVisible: false,
      error: null,
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async handleSubmit(updatedData) {
      try {
        const response = await updateProduct(this.productId, updatedData);
        console.log("Product updated:", response.data);
      } catch (error) {
        console.error("Error updating product:", error);
        this.error =
          "Error updating product, check your input data. Error message: " +
          error.message;
      }
    },
    clearError() {
      this.error = null;
    },
  },
};
</script>
