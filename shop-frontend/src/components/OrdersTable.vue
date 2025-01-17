<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Orders</h1>
    <div v-if="orders.length === 0" class="text-center">
      <p>No orders to display.</p>
    </div>
    <div v-else>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Status</th>
            <th>Products</th>
            <th v-if="allowActions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.username }}</td>
            <td>{{ order.email }}</td>
            <td>{{ order.phone_number }}</td>
            <td>{{ order.status }}</td>
            <td>
              <ul>
                <li
                  v-for="product in getProductsByOrder(order.id)"
                  :key="product.id"
                >
                  Name: {{ product.name }} <br />
                  <span class="tab">Count: {{ product.quantity }}</span>
                </li>
              </ul>
            </td>
            <td class="buttons" v-if="allowActions">
              <div class="actions-container">
                <button
                  v-if="status === 'UNCONFIRMED'"
                  class="btn btn-success btn-sm"
                  @click="updateStatus(order.id, 'CONFIRMED')"
                >
                  Confirm
                </button>
                <button
                  v-if="status === 'CONFIRMED'"
                  class="btn btn-success btn-sm"
                  @click="updateStatus(order.id, 'COMPLETED')"
                >
                  Completed
                </button>
                <button
                  class="btn btn-danger btn-sm"
                  @click="updateStatus(order.id, 'CANCELLED')"
                >
                  Cancel
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { fetchAllOrders, updateOrderStatus, getProductsByOrder } from "../api";

export default {
  props: {
    status: {
      type: String,
      required: true,
    },
    allowActions: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      orders: [],
      products: [],
    };
  },
  async created() {
    try {
      const response1 = await fetchAllOrders(this.status);
      const response2 = await getProductsByOrder();
      this.orders = response1.data;
      this.products = response2.data;
    } catch (err) {
      console.error("Error fetching orders:", err.message);
    }
  },
  methods: {
    async updateStatus(orderId, status) {
      try {
        await updateOrderStatus(orderId, status);
        alert(`Order ${orderId} marked as ${status}`);
        this.orders = this.orders.filter((order) => order.id !== orderId);
      } catch (err) {
        console.error("Error updating order status:", err.message);
      }
    },
    getProductsByOrder(id) {
      return this.products.filter((product) => product.order_id === id);
    },
  },
  computed: {
    filteredOrders() {
      return this.orders.filter((order) => order.status === this.status);
    },
  },
};
</script>

<style>
.container {
  margin-top: 20px;
}
td ul {
  text-align: left;
  padding-left: 0;
  list-style-position: inside;
}

td ul li {
  text-align: left;
}
.tab {
  display: inline-block;
  margin-left: 1.4em;
}
.actions-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  height: 100%;
}

.actions-container button {
  flex: 1;
  height: 40px;
}
.buttons {
  vertical-align: bottom;
}
</style>
