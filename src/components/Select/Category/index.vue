<script setup>
import { useAttrs } from "vue";
import { getCategory } from "@/services/category.service";
import { useQuery } from "@tanstack/vue-query";
import { QK_CATEGORY_OPTIONS } from "@/constants/query-key.constant";
import SelectForm from "@/components/Form/SelectForm.vue";
import { useField } from "vee-validate";

const attrs = useAttrs();

const props = defineProps({
  label: String,
  name: String,
  placeholder: String,
})

const { value, errorMessage } = useField(() => props.name);

const { data: categories } = useQuery({
  queryKey: [QK_CATEGORY_OPTIONS],
  queryFn: getCategory
});

</script>

<template>
  <SelectForm :id="name" :label="label" class="w-full" name="category">
    <option :value="placeholder ? '' : null">{{ placeholder || "" }}</option>
    <option v-for="(category, key) in categories" :key="key" :value="category">{{ category?.name }}</option>
  </SelectForm>
</template>