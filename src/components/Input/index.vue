<template>
  <div>
    <label :for="attrs.name" v-if="label" class="text-sm">{{ label }}</label>
    <div class="bg-white shadow px-4 py-2 rounded text-sm border border-gray-300"
      :class="[{ 'border-red-500': errorMessage }]" v-bind="attrs">
      <input :id="attrs.name" class="outline-0 border-0 w-full" v-model="model" v-bind="attrs" />
    </div>
  </div>
</template>

<script setup>
import { useAttrs } from 'vue';

const attrs = useAttrs();
const model = defineModel();
defineProps({ label: String })
</script>