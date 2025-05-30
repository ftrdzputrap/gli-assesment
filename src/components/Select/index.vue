<template>
  <div>
    <label :for="attrs.name" v-if="label" class="text-sm">{{ label }}</label>
    <select :id="attrs.name" v-model="model" v-bind="attrs"
      class="bg-white shadow px-4 py-2 rounded text-sm appearance-none border border-gray-300 outline-0">
      <slot />
    </select>
  </div>
</template>

<script setup>
import { useAttrs } from 'vue';

const attrs = useAttrs();
const model = defineModel();
defineProps({ label: String })
</script>