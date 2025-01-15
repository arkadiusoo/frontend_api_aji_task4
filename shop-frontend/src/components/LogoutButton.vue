<template>
  <div>
    <h2>Welcome! You are logged in.</h2>
    <button class="btn btn-danger" @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  props: {
    onLogout: {
      type: Function,
      required: true,
    },
  },
  methods: {
    logout() {
      this.onLogout(); // Wywołanie przekazanej funkcji wylogowania
    },
  },
};
</script>

<style>
button {
  margin-top: 10px;
}
</style>
