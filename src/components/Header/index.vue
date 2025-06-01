<script setup>
import { useCommonStore } from '@/stores/common.store';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const commonStore = useCommonStore();

const isOpen = computed(() => commonStore.isOpen);

const handleSidebar = () => {
  commonStore.setIsOpen(!isOpen.value)
}

const path = computed(() => route.path);
watch(path, () => {
  commonStore.setIsOpen(false)
}, { immediate: true })

</script>

<template>
  <header>
    <div class="flex items-center justify-between h-16 px-8">
      <div class="flex items-center gap-2">
        <h2 class="text-xl font-semibold text-gray-800">{{ route.name }}</h2>
      </div>
      <div class="flex items-center space-x-4">
        <button @click="handleSidebar"
          class="rounded-md lg:hidden transition-transform hover:scale-110 hover:cursor-pointer">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <!-- <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /> -->
          </svg>
        </button>
        <div class="flex items-center space-x-2">
          <img class="w-8 h-8 rounded-full" src="https://ui-avatars.com/api/?name=John+Doe" alt="User avatar">
          <span class="text-sm font-medium text-gray-700">John Doe</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>