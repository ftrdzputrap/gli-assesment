<template>
  <slot />
</template>

<script setup>
import { useModalStore } from '@/stores/modal.store';
import { provide, ref } from 'vue';

const modal = useModalStore();

const isModalOpen = ref(false);
const modalContent = ref(null);

const openModal = (content, props) => {
  modalContent.value = content;
  if (props) modal.setProps(props);
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  modalContent.value = null;
  modal.setProps({});
};

provide('modal', {
  isModalOpen,
  modalContent,
  openModal,
  closeModal,
});
</script>