<script setup>
import { RouterView } from 'vue-router';
import LoaderProvider from '@/provider/Loader/LoaderProvider.vue';
import ModalProvider from '@/provider/Modal/ModalProvider.vue';

import Modal from '@/components/Modal/index.vue';
</script>

<template>
  <ModalProvider>
    <LoaderProvider>
      <RouterView />
      <Modal />
    </LoaderProvider>
  </ModalProvider>
</template>
