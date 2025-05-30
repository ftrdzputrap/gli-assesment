<script setup>
import router from "@/router";
import { inject } from "vue";

const { closeModal } = inject('modal');

const handleSubmit = () => {
  router.back()
  closeModal();
}
</script>

<template>
  <div class="">
    <header class="mb-4">
      <h2 class="text-xl font-semibold text-gray-800">Confirmation</h2>
    </header>

    <div class="mb-6 text-gray-700">
      Are you sure you want to cancel this process?
    </div>

    <footer class="flex justify-end gap-3">
      <button class="px-4 py-2 rounded bg-gray-600 text-white font-medium hover:bg-gray-700 transition"
        @click="closeModal">
        No
      </button>

      <button class="px-4 py-2 rounded bg-green-600 text-white font-medium hover:bg-green-700 transition"
        @click="handleSubmit">
        Proceed
      </button>
    </footer>
  </div>
</template>