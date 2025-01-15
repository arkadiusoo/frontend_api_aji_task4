<template>
  <div>
    <LoginForm v-if="!isLoggedIn" :error="error" @submit="loginUser" />
    <LogoutButton v-else />
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
      error: null, // Przechowuje błędy logowania
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token"); // Sprawdza, czy token istnieje
    },
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
        this.error = "Username and password are required.";
        return;
      }

      try {
        this.error = null;

        const response = await login(credentials);

        const token = response.data.token;
        localStorage.setItem("token", token);
        window.location.reload();

        // Przekierowanie na stronę główną
        this.$router.push("/login");
      } catch (err) {
        console.error("Loging in failed:", err.message);
        this.error = "Invalid username or password.";
      }
    },
  },
};
</script>
