<template>
  <div>
    <button class="btn btn-primary mt-4" @click="openModal">
      Confirm Order
    </button>
    <!-- Użycie komponentu OrderModal -->
    <OrderModal v-if="isModalVisible" :cart="cart" @close="closeModal" />
  </div>
</template>

<script>
import OrderModal from "./OrderModal.vue"; // Import komponentu OrderModal

export default {
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  components: {
    OrderModal, // Rejestracja komponentu
  },
  data() {
    return {
      isModalVisible: false, // Kontrola widoczności modalu
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
