<script setup>
import ProtectLayout from '@/layouts/Protect/ProtectLayout.vue';
import Table from '@/components/Table/index.vue';
import { computed, inject, ref, watch } from 'vue';
import { getProduct } from '@/services/product.service';
import { useQuery } from '@tanstack/vue-query';
import { QK_PRODUCT } from "@/constants/query-key.constant";

import tableColumn from "./constant/TableColumn"
import ModalDeleteConfirmation from './components/ModalDeleteConfirmation.vue';

import useDebounce from '@/composable/useDebounce';

import Input from "@/components/Input/index.vue";
import SelectCategory from "@/components/Select/Category/index.vue";
import { ROUTE_PRODUCT_CREATE, ROUTE_PRODUCT_UPDATE } from '@/constants/route.constant';
import router from '@/router';
import { useRoute } from 'vue-router';

const { openModal } = inject('modal');

const route = useRoute();

const offset = ref(parseInt(route?.query?.offset) || 0);
const limit = ref(5);
const [title, debouncedTitle] = useDebounce(route.query.title, 500);
const [price_min, debouncedPriceMin] = useDebounce("", 500);
const [price_max, debouncedPriceMax] = useDebounce("", 500);
const categoryId = ref("");

const queryParams = computed(() => ({
  offset: offset.value,
  limit: limit.value,
  title: debouncedTitle.value,
  price_min: debouncedPriceMin.value,
  price_max: debouncedPriceMax.value,
  categoryId: categoryId.value?.id
}))

const { data, isLoading } = useQuery({
  queryKey: [QK_PRODUCT, queryParams],
  queryFn: async ({ queryKey }) => {
    const params = queryKey?.[1];
    const response = await getProduct(params)
    return response
  }
})

const deleteUser = (data) => {
  openModal(ModalDeleteConfirmation, data)
}

const onChangePage = (newOffset) => {
  offset.value = newOffset
  router.push({ query: { ...route?.query, offset: newOffset } });
}

watch(title, (newTitle) => {
  router.push({ query: { title: newTitle } });
  offset.value = 0
})

</script>

<template>
  <ProtectLayout>
    <div class="flex flex-col items-center justify-between gap-4 mb-4 lg:flex-row">
      <div class="grid grid-cols-4 gap-4 flex-1 w-full">
        <Input class="col-span-4 lg:col-span-1" v-model="title" placeholder="Search..." />
        <Input v-model="price_min" placeholder="Min. Price" />
        <Input v-model="price_max" placeholder="Max. Price" />
        <SelectCategory class="col-span-2 lg:col-span-1" v-model="categoryId" placeholder="Category" />
      </div>
      <div class="flex-1 flex justify-end w-full">
        <router-link :to="ROUTE_PRODUCT_CREATE"
          class="bg-blue-600 px-4 py-2 text-sm text-center rounded shadow text-white transform transition-all hover:scale-100 lg:hover:scale-105 hover:bg-blue-700 hover:text-white active:scale-95 hover:cursor-pointer w-full lg:w-fit">Add
          Product</router-link>
      </div>
    </div>
    <Table :rows="data" :headers="tableColumn" :isLoading="isLoading" @onChangePage="onChangePage"
      :pagination="{ offset, limit: 5 }">
      <template #cell-images="{ row }">
        <div class="flex items-center">
          <img class="h-20 w-20 rounded-lg object-cover bg-gray-100" :src="row?.images?.[0]" :alt="row?.title" />
        </div>
      </template>
      <template #cell-actions="{ row }">
        <div class="flex items-center gap-2">
          <router-link :to="ROUTE_PRODUCT_UPDATE.replace(':id', row?.id)"
            class="border border-green-700 text-green-700 rounded p-1 uppercase tracking-wider whitespace-nowrap text-xs transform transition-all hover:scale-105 hover:bg-green-700 hover:text-white active:scale-95 hover:cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 inline-block" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </router-link>
          <button @click="deleteUser(row)"
            class="border border-red-700 text-red-700 rounded p-1 uppercase tracking-wider whitespace-nowrap text-xs transform transition-all hover:scale-105 hover:bg-red-700 hover:text-white active:scale-95 hover:cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 inline-block" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </template>
    </Table>
  </ProtectLayout>
</template>