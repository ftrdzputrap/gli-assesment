<script setup>
import { computed } from 'vue'

const props = defineProps({
  headers: {
    type: Array,
    default: () => []
  },
  rows: {
    type: Array,
    default: () => []
  },
  pagination: {
    type: Object,
    default: () => ({})
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits({
  onChangePage: {
    type: Function,
  }
})

const currentPage = computed(() => {
  return (props.pagination?.offset || 0) + 1
})

const onPrev = () => {
  const newOffset = props.pagination?.offset <= 0 ? 0 : props.pagination?.offset - 1
  emit("onChangePage", newOffset)
}

const onNext = () => {
  const newOffset = props.pagination?.offset + 1
  emit("onChangePage", newOffset)
}

const onPageClick = (page) => {
  emit("onChangePage", page - 1)
}
</script>

<template>
  <div class="border border-gray-200 overflow-hidden rounded-xl text-slate-500 overflow-x-auto space-y-4">
    <table className="items-center w-full mb-0 align-top">
      <thead class="bg-gray-50 border-b border-gray-200">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
            v-for="(header, key) in headers" :key="key">
            <div :class="{ [header?.headerClassName]: !!header?.headerClassName }">
              {{ header?.title }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-if="isLoading">
          <td :colspan="headers?.length" class="px-6 py-4 whitespace-nowrap text-sm">
            <div class="flex items-center justify-center">Loading...</div>
          </td>
        </tr>
        <tr v-else-if="!rows?.length">
          <td :colspan="headers?.length" class="px-6 py-4 whitespace-nowrap text-sm">
            <div class="flex items-center justify-center">No Data.</div>
          </td>
        </tr>
        <tr v-else v-for="(row, key) in rows" :key="key">
          <td class="px-6 py-4 whitespace-nowrap text-sm" v-for="(header, subKey) in headers" :key="subKey">
            <slot v-if="typeof header?.render === 'undefined'" :name="`cell-${header?.id}`" :row="row">
              {{ header?.render(row?.[header?.id], row, key) }}
            </slot>
            <div v-else :class="{ [header?.className]: !!header?.className }"
              v-html="header?.render(row?.[header?.id], row, key)"></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex items-center justify-between gap-4 mt-4" v-if="rows?.length > 0">
    <div class="text-sm text-gray-500">
      Page {{ currentPage }}
    </div>
    <div class="flex items-center gap-2">
      <button @click="onPrev"
        class="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="currentPage <= 1">
        Previous
      </button>
      <div v-for="page in pagination?.limit" :key="page" @click="onPageClick(page)"
        class="w-8 h-8 flex items-center justify-center border rounded-md cursor-pointer hover:bg-gray-50"
        :class="{ 'bg-blue-50 border-blue-500 text-blue-600': page === currentPage, 'bg-white border-gray-300 text-gray-700': page !== currentPage }">
        {{ page }}
      </div>
      <button @click="onNext"
        class="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="currentPage >= pagination?.limit">
        Next
      </button>
    </div>
  </div>
</template>