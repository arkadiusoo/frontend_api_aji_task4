<template>
  <div class="container mt-5">
    <h1 class="text-center">Login</h1>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="localCredentials.username"
          class="form-control"
          required
        />
      </div>
      <div class="form-group mt-3">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="localCredentials.password"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary mt-4 w-100">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    credentials: {
      type: Object,
      required: true,
    },
    error: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      localCredentials: { ...this.credentials },
    };
  },
  methods: {
    handleSubmit() {
      console.log("Form submitted with:", this.localCredentials); // Debugowanie
      this.$emit("submit", { ...this.localCredentials });
    },
  },
};
</script>

<style>
.container {
  max-width: 400px;
  margin: auto;
}
</style>
