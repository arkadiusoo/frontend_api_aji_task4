<template>
  <div class="container mt-5">
    <h1 class="text-center">Login</h1>

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
    error: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      localCredentials: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      try {
        this.$emit("submit", { ...this.localCredentials });

        this.resetCredentials();
      } catch (error) {
        console.error("Błąd w handleSubmit:", error);
      }
    },
    resetCredentials() {
      this.localCredentials.username = "";
      this.localCredentials.password = "";
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
