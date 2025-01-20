<template>
  <div>
    <h2>
      Welcome <strong>{{ username }}</strong
      >! You are logged in.
    </h2>
    <button class="btn btn-danger" @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      return localStorage.getItem("username");
    },
  },
  methods: {
    logout() {
      localStorage.setItem("token", "");
      localStorage.setItem("role", "");
      localStorage.setItem("username", "");
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
