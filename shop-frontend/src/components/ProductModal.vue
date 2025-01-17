<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ title }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            type="text"
            class="form-control"
            v-model="formData.name"
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
            type="number"
            step="0.01"
            class="form-control"
            v-model="formData.price_unit"
          />
        </div>
        <div class="form-group">
          <label for="weight">Weight</label>
          <input
            id="weight"
            type="number"
            step="0.0001"
            class="form-control"
            v-model="formData.weight_unit"
          />
        </div>
        <div class="form-group">
          <label for="category">Category</label>
          <select
            id="category"
            class="form-control"
            v-model="formData.category"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.name"
            >
              {{ category.name }}
            </option>
          </select>
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
</template>

<script>
import { fetchCategories } from "../api";

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    productData: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: "Edit Product",
    },
  },
  data() {
    return {
      formData: { ...this.productData },
      categories: [],
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async submitForm() {
      const filteredData = Object.fromEntries(
        Object.entries(this.formData).filter(
          ([, value]) => value !== "" && value !== null
        )
      );
      this.$emit("submit", filteredData);
      this.closeModal();
    },
  },
  async created() {
    try {
      const response = await fetchCategories();
      this.categories = response.data;
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
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
  gap: 10px;
}
</style>
