<template>
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in cart" :key="item.id">
        <td>{{ item.name }}</td>
        <td>
          {{
            item.quantity > 0
              ? (item.price_unit * item.quantity).toFixed(2)
              : "0.00"
          }}
          USD
        </td>
        <td>
          <div class="quantity-controls">
            <button
              class="btn btn-secondary btn-sm"
              @click="$emit('updateQuantity', item.id, item.quantity - 1)"
              :disabled="item.quantity <= 1"
            >
              -
            </button>
            <input
              type="text"
              class="quantity"
              v-model.number="item.quantity"
              @change="handleQuantityChange(item)"
              style="width: 50px; text-align: center"
              onwheel="this.blur()"
            />
            <button
              class="btn btn-secondary btn-sm"
              @click="$emit('updateQuantity', item.id, item.quantity + 1)"
            >
              +
            </button>
          </div>
        </td>
        <td>
          <button
            class="btn btn-danger"
            @click="$emit('removeFromCart', item.id)"
          >
            Remove
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleQuantityChange(item) {
      if (!item.quantity || item.quantity < 1) {
        item.quantity = 1;
      } else {
        item.quantity = Math.floor(item.quantity);
      }
      this.$emit("updateQuantity", item.id, item.quantity);
    },
  },
};
</script>

<style>
.quantity-controls button {
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 10;
  margin: 0 10px;
}

.quantity {
  font-weight: bold;
}
</style>
