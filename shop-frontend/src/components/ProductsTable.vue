<template>
  <div>
    <!-- Filtry -->
    <div class="filters mb-4">
      <div class="form-group mx-auto filter-field">
        <label for="nameFilter">Filter by Name</label>
        <input
          type="text"
          id="nameFilter"
          class="form-control"
          v-model="filters.name"
          placeholder="Enter product name"
        />
      </div>
      <div class="form-group mx-auto filter-field mt-3">
        <label for="categoryFilter">Filter by Category</label>
        <select
          id="categoryFilter"
          class="form-control"
          v-model="filters.category"
        >
          <option value="">All Categories</option>
          <option
            v-for="category in uniqueCategories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <!-- Tabela -->
    <table class="table table-bordered table-striped">
      <thead class="thead-dark">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Weight</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price_unit }} USD</td>
          <td>{{ product.weight_unit }} kg</td>
          <td>{{ product.category }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filters: {
        name: "",
        category: "",
      },
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        const matchesName = product.name
          .toLowerCase()
          .includes(this.filters.name.toLowerCase());
        const matchesCategory =
          !this.filters.category || product.category === this.filters.category;

        return matchesName && matchesCategory;
      });
    },
    uniqueCategories() {
      return [...new Set(this.products.map((product) => product.category))];
    },
  },
};
</script>

<style>
.filters {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-field {
  width: 20%;
  text-align: center;
}
.table {
  margin-top: 20px;
}
</style>
