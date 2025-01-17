<template>
  <div v-if="isLoggedIn">
    <div class="container mt-4" v-if="isWorker">
      <h1 class="text-center mb-4">Manage Orders</h1>
      <div>
        <button class="btn btn-primary me-2" @click="setView('UNCONFIRMED')">
          Unconfirmed Orders
        </button>
        <button class="btn btn-primary me-2" @click="setView('CONFIRMED')">
          Confirmed Orders
        </button>
        <button class="btn btn-primary me-2" @click="setView('COMPLETED')">
          Completed Orders
        </button>
        <button class="btn btn-primary" @click="setView('CANCELLED')">
          Cancelled Orders
        </button>
      </div>
      <OrdersTable
        v-if="currentView"
        :status="currentView"
        :allowActions="
          currentView === 'UNCONFIRMED' || currentView === 'CONFIRMED'
        "
      />
    </div>
    <div class="container mt-4" v-if="isClient">
      <ClientOrders />
    </div>
  </div>
  <div v-else class="text-center">
    <p>Please log in to access the content.</p>
    <router-link to="/login" class="btn btn-primary">Login</router-link>
  </div>
</template>

<script>
import OrdersTable from "../components/OrdersTable.vue";
import ClientOrders from "../components/ClientOrders.vue";

export default {
  components: {
    OrdersTable,
    ClientOrders,
  },
  created() {
    const userRole = localStorage.getItem("role");
    this.isClient = userRole === "CLIENT";
    this.isWorker = userRole === "WORKER";
  },
  data() {
    return {
      currentView: "UNCONFIRMED",
      isClient: false,
      isWorker: false,
      isLoggedIn: !!localStorage.getItem("token"),
    };
  },
  methods: {
    setView(status) {
      this.currentView = status;
    },
  },
};
</script>

<style>
.container {
  margin-top: 20px;
}
</style>
