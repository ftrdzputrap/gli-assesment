<template>
  <div>
    <div v-if="isOpen" @click="closeSidebar" class="fixed inset-0 bg-black/70 bg-opacity-50 lg:hidden z-[1]"></div>

    <aside :class="[
      'fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[2]',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-center pt-4">
          <h1 class="text-xl font-bold text-gray-800">ASSESMENT</h1>
        </div>

        <nav class="flex-1 px-4 py-4 space-y-2">
          <router-link to="/dashboard" class="flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
            active-class="bg-gray-100 text-gray-900" exact-active-class="bg-blue-50 text-blue-600">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </router-link>
          <router-link to="/product" class="flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
            active-class="bg-gray-100 text-gray-900" exact-active-class="bg-blue-50 text-blue-600">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Product
          </router-link>
        </nav>

        <div class="p-4">
          <button @click="onSignOut"
            class="flex items-center w-full px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.store';
import router from '@/router';
import { ref } from 'vue';
import { useCommonStore } from '@/stores/common.store';
import { computed } from 'vue';

const store = useAuthStore();
const commonStore = useCommonStore();

const isOpen = computed(() => commonStore.isOpen);

const onSignOut = () => {
  store.setToken(null);
  router.push('/');
};

const closeSidebar = () => {
  commonStore.setIsOpen(!isOpen.value)
}
</script>