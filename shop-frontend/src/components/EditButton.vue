<template>
  <div>
    <button class="btn btn-warning" @click="openModal">Edit</button>

    <div v-if="isModalVisible" class="modal-overlay">
      <div class="modal-content">
        <h2>Edit Product</h2>
        <form @submit.prevent="submitEdit">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="form-control"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input
              id="price"
              v-model="formData.price_unit"
              type="number"
              step="0.01"
              class="form-control"
              min="0.01"
            />
          </div>
          <div class="form-group">
            <label for="weight">Weight</label>
            <input
              id="weight"
              v-model="formData.weight_unit"
              type="number"
              step="0.0001"
              class="form-control"
              min="0.0001"
            />
          </div>
          <div class="form-group">
            <label for="category">Category</label>
            <input
              id="category"
              v-model="formData.category"
              type="text"
              class="form-control"
            />
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "../api.js";

export default {
  props: {
    productId: {
      type: Number,
      required: true,
    },
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isModalVisible: false,
      formData: { ...this.product },
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async submitEdit() {
      try {
        const updatedData = Object.fromEntries(
          Object.entries(this.formData).filter(
            ([, value]) => value !== "" && value !== null
          )
        );
        console.log("Filtered product data for API:", updatedData);

        console.log("Filtered product data for API:", updatedData);

        const response = await apiClient.put(
          `/products/${this.productId}`,
          updatedData
        );

        console.log("Update successful:", response.data);

        this.closeModal();
        window.location.reload();
      } catch (error) {
        console.error("Error updating product:", error.message);
      }
    },
  },
};
</script>

<style>
.modal-content {
  background: rgba(255, 255, 255, 0.95) !important;
  padding: 30px;
  border-radius: 15px !important;
  width: 50%;
  max-width: 600px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  margin: 10px 5px 0 0;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
