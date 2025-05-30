<script setup>
import { inject, useAttrs } from "vue";

const { closeModal } = inject('modal');

const { args } = useAttrs();

const handleSubmit = () => {
  args.onSubmit(args.props)
}
</script>

<template>
  <div class="">
    <header class="mb-4">
      <h2 class="text-xl font-semibold text-gray-800">Submit Data Confirmation</h2>
    </header>

    <div class="mb-6 text-gray-700">
      Are you sure you want to submit this data?
    </div>

    <footer class="flex justify-end gap-3">
        <button
          class="px-4 py-2 rounded bg-gray-600 text-white font-medium hover:bg-gray-700 transition"
          @click="closeModal"
        >
          Cancel
        </button>

        <button
          class="px-4 py-2 rounded bg-green-600 text-white font-medium hover:bg-green-700 transition"
          @click="handleSubmit"
        >
          Submit
        </button>
      </footer>
  </div>
</template>