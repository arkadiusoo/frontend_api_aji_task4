<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Orders</h1>
    <div v-if="orders.length === 0" class="text-center">
      <p>You have no orders to process.</p>
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
            <th v-if="status != 'UNCONFIRMED'">Approval date</th>
            <th>Products</th>
            <th>Total cost</th>
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
            <td v-if="status != 'UNCONFIRMED'">
              {{ formatApprovalDate(order.approval_date) }}
            </td>
            <td>
              <ul>
                <li
                  v-for="product in getProductsByOrder(order.id)"
                  :key="product.id"
                >
                  Name: {{ product.name }} <br />
                  <span class="tab">Count: {{ product.quantity }}</span> <br />
                  <span class="tab">Price: {{ product.price_unit }} USD</span>
                </li>
              </ul>
            </td>
            <td>{{ calculateTotalPrice(getProductsByOrder(order.id)) }} USD</td>
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

      this.orders = response1.data;
    } catch (err) {
      console.error("Error fetching orders:", err.message);
    }
    try {
      const response2 = await getProductsByOrder();
      this.products = response2.data;
    } catch (err) {
      console.error("Error fetching orders:", err.message);
    }
  },
  methods: {
    async updateStatus(orderId, status) {
      try {
        await updateOrderStatus(orderId, status);
        const response1 = await fetchAllOrders(this.status);
        this.orders = response1.data;
      } catch (err) {
        console.error("Error updating order status:", err.message);
      }
    },
    getProductsByOrder(id) {
      return this.products.filter((product) => product.order_id === id);
    },
    formatApprovalDate(date) {
      if (!date) return "";
      const parsedDate = new Date(date);
      const day = String(parsedDate.getDate()).padStart(2, "0");
      const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
      const year = parsedDate.getFullYear();
      return `${day}-${month}-${year}`;
    },
    calculateTotalPrice(products) {
      return products
        .reduce(
          (total, product) => total + product.price_unit * product.quantity,
          0
        )
        .toFixed(2);
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
