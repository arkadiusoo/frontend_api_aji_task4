<template>
  <div class="container mt-5">
    <h1 class="text-center">Login</h1>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="credentials.username"
          class="form-control"
          required
        />
      </div>
      <div class="form-group mt-3">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="credentials.password"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary mt-4 w-100">Login</button>
    </form>
  </div>
</template>

<script>
import { login } from "../api";

export default {
  data() {
    return {
      credentials: {
        username: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    async loginUser() {
      try {
        this.error = null;
        const response = await login(this.credentials);
        const token = response.data.token;
        localStorage.setItem("token", token);
        this.$router.push("/");
      } catch (err) {
        console.error("Login failed:", err.message);
        this.error = "Invalid username or password.";
      }
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
