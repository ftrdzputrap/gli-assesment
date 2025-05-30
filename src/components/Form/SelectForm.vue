<template>
  <div>
    <Select v-model="value" v-bind="attrs">
      <slot />
    </Select>
    <label class="text-xs text-red-500" v-if="errorMessage">{{ errorMessage }}</label>
  </div>
</template>

<script setup>
import { useAttrs } from 'vue';
import { useField } from 'vee-validate';
import Select from "@/components/Select/index.vue";

const attrs = useAttrs();

const props = defineProps({
  name: String,
});

const { value, errorMessage } = useField(() => props.name);
</script>