<template>
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal relative">
      <component :is="modalContent" :args="modal?.props" />
      <!-- <button class="absolute top-0 right-0" @click="closeModal">Close</button> -->
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { useModalStore } from '@/stores/modal.store';

const modal = useModalStore();

const { isModalOpen, modalContent, closeModal } = inject('modal');
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
</style>