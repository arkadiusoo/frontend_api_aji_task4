<template>
  <div>
    <div class="filters">
      <div class="form-group">
        <label for="nameFilter">Filter by Name:</label>
        <input
          id="nameFilter"
          type="text"
          class="form-control"
          v-model="filters.name"
          placeholder="Enter product name"
        />
      </div>
      <div class="form-group">
        <label for="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          class="form-control"
          v-model="filters.category"
        >
          <option value="">All Categories</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.name"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
    </div>

    <table class="table table-bordered table-striped">
      <thead class="thead-dark">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Weight</th>
          <th>Category</th>
          <th v-if="isClient || isWorker">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price_unit }} USD</td>
          <td>{{ product.weight_unit }} kg</td>
          <td>{{ product.category }}</td>
          <td v-if="isClient || isWorker">
            <BuyButton v-if="isClient" :productId="product.id" />
            <EditButton
              v-if="isWorker"
              :productId="product.id"
              :product="product"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BuyButton from "./BuyButton.vue";
import EditButton from "./EditButton.vue";
import { fetchCategories } from "../api";

export default {
  components: {
    BuyButton,
    EditButton,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
    isClient: {
      type: Boolean,
      required: true,
    },
    isWorker: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      filters: {
        name: "",
        category: "",
      },
      categories: [],
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        const matchesName = product.name
          .toLowerCase()
          .includes(this.filters.name.toLowerCase());
        const matchesCategory =
          this.filters.category === "" ||
          product.category.toLowerCase() ===
            this.filters.category.toLowerCase();
        return matchesName && matchesCategory;
      });
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
.table {
  margin-top: 20px;
}

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.filters .form-group {
  flex: 1;
}
</style>
