<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Upload Initial Products</h2>
      <form @submit.prevent="handleFileUpload">
        <div class="form-group">
          <label for="file">Select a file:</label>
          <input
            type="file"
            id="file"
            class="form-control"
            @change="onFileChange"
            required
          />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Upload</button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="$emit('close')"
          >
            Cancel
          </button>
        </div>
      </form>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import { initializeProducts } from "../api";

export default {
  data() {
    return {
      file: null,
      error: null,
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    async handleFileUpload() {
      if (!this.file) {
        this.error = "Please select a file.";
        return;
      }

      try {
        const response = await initializeProducts(this.file);
        this.$emit("productsInitialized");
        this.$emit("close");
        console.log(response.data.message);
      } catch (error) {
        this.error =
          error.response?.data?.message || "Failed to upload products.";
      }
    },
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}
</style>
