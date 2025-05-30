<template>
  <div>
    <slot />
    <div v-if="loading" class="loader-overlay">
      <!-- You can customize this loader -->
      <div class="spinner animate-bounce">Loading...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'

const loading = ref(false)

function showLoader() {
  loading.value = true
}

function hideLoader() {
  loading.value = false
}

// Provide methods and state to children
provide('loader', {
  loading,
  showLoader,
  hideLoader
})

</script>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.spinner {
  color: white;
  font-size: 24px;
}
</style>
