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
  props: {
    onLogout: {
      type: Function,
      required: true,
    },
  },
  computed: {
    username() {
      return localStorage.getItem("username");
    },
  },
  methods: {
    logout() {
      this.onLogout();
    },
  },
};
</script>

<style>
button {
  margin-top: 10px;
}
</style>
