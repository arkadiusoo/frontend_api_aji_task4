<template>
  <div>
    <LoginForm v-if="!isLoggedIn" :error="error" @submit="loginUser" />
    <LogoutButton v-else />
    <ErrorModal v-if="error" :error="error" @clearError="clearError" />
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import LogoutButton from "../components/LogoutButton.vue";
import ErrorModal from "../components/ErrorModal.vue";
import { login } from "../api";

export default {
  components: {
    LoginForm,
    LogoutButton,
    ErrorModal,
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
        const role = response.data.role;
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", credentials.username);
        this.$router.push("/");
      } catch (err) {
        console.error("Login failed:", err.message);
        this.error = "Login failed: " + err.message;
      }
    },
    clearError() {
      this.error = null;
    },
  },
};
</script>
