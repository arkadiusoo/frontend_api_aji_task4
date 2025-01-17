<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">My Orders</h1>
    <div v-if="orders.length === 0" class="text-center">
      <p>You have no orders.</p>
    </div>
    <div v-else>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.username }}</td>
            <td>{{ order.email }}</td>
            <td>{{ order.phone_number }}</td>
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
            <td>{{ order.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { fetchOrdersByUsername, getProductsByOrder } from "../api";

export default {
  data() {
    return {
      orders: [],
      products: [],
      username: localStorage.getItem("username"),
    };
  },
  async created() {
    try {
      if (!this.username) {
        throw new Error("User is not logged in.");
      }

      const response1 = await fetchOrdersByUsername(this.username);
      const response2 = await getProductsByOrder();
      this.orders = response1.data;
      this.products = response2.data;
    } catch (err) {
      console.error("Error fetching client orders:", err.message);
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    calculateTotalPrice(products) {
      return products
        .reduce(
          (total, product) => total + product.price_unit * product.quantity,
          0
        )
        .toFixed(2);
    },
    getProductsByOrder(id) {
      return this.products.filter((product) => product.order_id === id);
    },
  },
};
</script>

<style>
.container {
  margin-top: 20px;
}
</style>
