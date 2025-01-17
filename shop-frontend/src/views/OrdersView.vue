<template>
  <div class="container mt-4">
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
</template>

<script>
import OrdersTable from "../components/OrdersTable.vue";

export default {
  components: {
    OrdersTable,
  },
  data() {
    return {
      currentView: "UNCONFIRMED",
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
