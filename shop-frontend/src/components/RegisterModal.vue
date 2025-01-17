<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            v-model="form.username"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="form.password"
            class="form-control"
            required
          />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Register</button>
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Cancel
          </button>
        </div>
      </form>
    </div>
    <ErrorModal v-if="error" :error="error" @clearError="clearError" />
  </div>
</template>

<script>
import ErrorModal from "../components/ErrorModal.vue";
import { registerUser } from "../api";

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    ErrorModal,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async register() {
      try {
        await registerUser(this.form);
        alert("Registration successful. Please log in.");
        this.closeModal();
      } catch (error) {
        // alert(error.response?.data?.message || "Registration failed.");
        this.error = error.response?.data?.message || "Registration failed.";
      }
    },
    clearError() {
      this.error = null;
      this.closeModal();
    },
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
}

button {
  margin: 10px 5px;
}
</style>
