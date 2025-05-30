<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
</script>

<template>
  <header>
    <div class="flex items-center justify-between h-16 px-8">
      <h2 class="text-xl font-semibold text-gray-800">{{ route.name }}</h2>
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <img class="w-8 h-8 rounded-full" src="https://ui-avatars.com/api/?name=John+Doe" alt="User avatar">
          <span class="text-sm font-medium text-gray-700">John Doe</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>