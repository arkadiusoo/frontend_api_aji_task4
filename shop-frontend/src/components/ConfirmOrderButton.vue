<template>
  <div>
    <button class="btn btn-primary mt-4" @click="openModal">
      Confirm Order
    </button>
    <!-- Użycie komponentu OrderModal -->
    <OrderModal
      v-if="isModalVisible"
      :cart="cart"
      @close="closeModal"
      :clearCartAfterOrder="clearCartAfterOrder"
    />
  </div>
</template>

<script>
import OrderModal from "./OrderModal.vue";

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
  components: {
    OrderModal,
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
