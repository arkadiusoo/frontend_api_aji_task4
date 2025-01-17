<template>
  <div class="home">
    <h1 class="text-center">Welcome to the Shop App</h1>
    <div v-if="isLoggedIn">
      <div class="welcome-section">
        <p v-if="isClient">
          Welcome, {{ username }}! You are logged in as a Client.
        </p>
        <p v-if="isWorker">
          Welcome, {{ username }}! You are logged in as a Worker.
        </p>
        <p v-else>Please log in to access your dashboard.</p>
      </div>

      <div class="actions">
        <router-link
          v-if="isClient"
          to="orders"
          class="btn btn-primary action-btn orders-btn"
        >
          View Orders
        </router-link>
        <router-link
          v-if="isWorker"
          to="/orders"
          class="btn btn-primary action-btn"
        >
          Manage Orders
        </router-link>
        <router-link to="/products" class="btn btn-success action-btn">
          Browse Products
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      username: localStorage.getItem("username") || "Guest",
      role: localStorage.getItem("role") || null,
      isLoggedIn: !!localStorage.getItem("token"),
    };
  },
  computed: {
    isClient() {
      return this.role === "CLIENT";
    },
    isWorker() {
      return this.role === "WORKER";
    },
  },
};
</script>

<style>
.home {
  text-align: center;
  margin-top: 20px;
}

.welcome-section {
  margin-bottom: 20px;
  font-size: 18px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn {
  margin-top: 10px;
  font-size: 16px;
  padding: 10px 20px;
}

.action-btn {
  height: 50px;
  display: flex;
  text-align: center;
}
</style>
