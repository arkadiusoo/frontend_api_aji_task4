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

    <p class="text-center mt-3">
      Don't have an account?
      <button type="button" class="btn btn-link p-0" @click="showRegisterModal">
        Register
      </button>
    </p>

    <!-- Register Modal -->
    <RegisterModal
      :isVisible="isRegisterModalVisible"
      @close="closeRegisterModal"
    />
  </div>
</template>

<script>
import RegisterModal from "./RegisterModal.vue";

export default {
  props: {
    error: {
      type: String,
      required: false,
    },
  },
  components: {
    RegisterModal,
  },
  data() {
    return {
      localCredentials: {
        username: "",
        password: "",
      },
      isRegisterModalVisible: false, // Kontrola widoczności modala rejestracji
    };
  },
  methods: {
    handleSubmit() {
      try {
        this.$emit("submit", { ...this.localCredentials });
        this.$emit("update-is-logged", true);
        this.resetCredentials();
      } catch (error) {
        console.error("Błąd w handleSubmit:", error);
      }
    },
    resetCredentials() {
      this.localCredentials.username = "";
      this.localCredentials.password = "";
    },
    showRegisterModal() {
      this.isRegisterModalVisible = true;
    },
    closeRegisterModal() {
      this.isRegisterModalVisible = false;
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
