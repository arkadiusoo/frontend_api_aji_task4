<template>
  <h2>Welcome! You are logged in.</h2>
  <button class="btn btn-danger" @click="logout">Logout</button>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      window.location.reload();
    },
  },
};
</script>

<style>
button {
  margin-top: 10px;
}
</style>
