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
  </div>
</template>

<script>
import ProductModal from "./ProductModal.vue";
import { updateProduct } from "../api";

export default {
  components: { ProductModal },
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
        window.location.reload();
      } catch (error) {
        console.error("Error updating product:", error.message);
      }
    },
  },
};
</script>
