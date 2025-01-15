<template>
  <div>
    <LoginForm
      v-if="!isLoggedIn"
      :credentials="credentials"
      :error="error"
      @submit="loginUser"
    />
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
      credentials: {
        username: "",
        password: "",
      },
      error: null,
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token"); // Sprawdza, czy token istnieje
    },
  },
  methods: {
    async loginUser(localCredentials) {
      if (!localCredentials.username || !localCredentials.password) {
        console.log(
          "jestem w if na poczatku sprawdzam o co chodzi: ",
          localCredentials.username,
          localCredentials.password
        );
        console.log(localCredentials);
        console.log(!localCredentials.username || !localCredentials.password);
        console.error("Invalid credentials:", localCredentials);
        console.log("koniec sprawdzania");
        this.error = "Username and password are required.";
        return;
      }

      try {
        console.log("Login requested with:", localCredentials);
        this.error = null;
        console.log("jestem w try i spraedzam zmienna:", localCredentials);
        const response = await login(localCredentials);
        console.log("Login successful:", response.data);

        const token = response.data.token;
        localStorage.setItem("token", token);

        // Zresetuj dane użytkownika
        this.credentials.username = "";
        this.credentials.password = "";

        // Przekieruj na stronę główną
        this.$router.push("/");
      } catch (err) {
        console.error("Login failed:", err.message);
        this.error = "Invalid username or password.";
      }
    },
  },
};
</script>
