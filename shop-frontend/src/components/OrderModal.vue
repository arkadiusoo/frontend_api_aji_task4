<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Confirm Order</h2>

      <form @submit.prevent="submitOrder">
        <div class="form-group">
          <label for="username">Name</label>
          <input
            id="username"
            v-model="formData.username"
            type="text"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input
            id="phone"
            v-model="formData.phone_number"
            type="tel"
            class="form-control"
            required
          />
        </div>
        <p>Total Price: {{ totalPrice }} USD</p>
        <div class="form-actions">
          <button type="submit" class="btn btn-success btn-same-height">
            Submit Order
          </button>
          <button
            type="button"
            class="btn btn-secondary btn-same-height"
            @click="$emit('close')"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { createOrder } from "../api";
export default {
  props: {
    cart: {
      type: Array,
      required: true,
    },
    clearCartAfterOrder: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        username: localStorage.getItem("username") || "",
        email: "",
        phone_number: "",
      },
    };
  },
  computed: {
    totalPrice() {
      return this.cart
        .reduce((total, item) => total + item.price_unit * item.quantity, 0)
        .toFixed(2);
    },
  },
  methods: {
    async submitOrder() {
      const orderData = {
        ...this.formData,
        products: this.cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };
      try {
        const respone = await createOrder(orderData);
        console.log("Order created:", respone.data);
        this.$emit("close");
        console.log(typeof this.clearCartAfterOrder);
        this.clearCartAfterOrder();
      } catch (error) {
        console.error("Error creating order:", error.message);
      }
    },
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 30%;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.btn-same-height {
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
