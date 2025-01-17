<template>
  <div v-if="error" class="modal-overlay">
    <div class="modal-content">
      <h2>Error</h2>
      <p>{{ error }}</p>
      <button class="btn btn-primary" @click="closeModal">Close</button>
    </div>
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
  methods: {
    closeModal() {
      this.$emit("clearError");
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
  margin-top: 20px;
}
</style>
