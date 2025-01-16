<template>
  <div v-if="isWorker">
    <button class="btn btn-success mb-3" @click="openModal">Add Product</button>
    <ProductModal
      :isVisible="isModalVisible"
      title="Add Product"
      :productData="{}"
      @submit="handleAddProduct"
      @close="closeModal"
    />
  </div>
</template>

<script>
import ProductModal from "./ProductModal.vue";
import { createProduct } from "../api";

export default {
  components: { ProductModal },
  props: {
    isWorker: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isModalVisible: false,
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
        window.location.reload();
        this.closeModal();
      } catch (error) {
        console.error("Error creating product:", error.message);
      }
    },
  },
};
</script>

<style>
.btn-success {
  margin-bottom: 20px;
}
</style>
