<template>
  <div>
    <button class="btn btn-warning" @click="openModal">Edit</button>

    <!-- Okno modalne -->
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
              required
            />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="form-control"
              required
            ></textarea>
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input
              id="price"
              v-model="formData.price"
              type="number"
              step="0.01"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="weight">Weight</label>
            <input
              id="weight"
              v-model="formData.weight"
              type="number"
              step="0.01"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="category">Category</label>
            <input
              id="category"
              v-model="formData.category"
              type="text"
              class="form-control"
              required
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
    submitEdit() {
      console.log("Edited product data:", this.formData);
      this.$emit("edit", { ...this.formData });
      this.closeModal();
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

/* Tło modalnego okna */
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

/* Styl przycisków */
button {
  margin: 10px 5px 0 0;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
