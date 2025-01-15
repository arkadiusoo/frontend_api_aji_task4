<template>
  <div>
    <LoginForm v-if="!isLoggedIn" :error="error" @submit="loginUser" />
    <LogoutButton v-else :onLogout="logoutUser" />
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import LogoutButton from "../components/LogoutButton.vue";
import { login } from "../api";

export default {
  components: {
    LoginForm,
    LogoutButton,
  },
  data() {
    return {
      error: null,
      isLoggedIn: !!localStorage.getItem("token"),
    };
  },
  methods: {
    async loginUser(credentials) {
      if (credentials instanceof SubmitEvent) {
        return;
      }
      if (
        !credentials ||
        typeof credentials !== "object" ||
        !credentials.username ||
        !credentials.password
      ) {
        console.log("Invalid credentials:", credentials);
        this.error = "Username and password are required.";
        return;
      }

      try {
        this.error = null;

        const response = await login(credentials);

        const token = response.data.token;
        localStorage.setItem("token", token);
        this.$router.push("/products");
        this.isLoggedIn = true;
      } catch (err) {
        console.error("Login failed:", err.message);
      }
    },
    logoutUser() {
      localStorage.removeItem("token");
      this.isLoggedIn = false;
    },
  },
};
</script>
