<script setup>
import { QK_PRODUCT_DETAIL } from "@/constants/query-key.constant";
import ProtectLayout from "@/layouts/Protect/ProtectLayout.vue";
import { useRoute } from "vue-router";
import FormProduct from "./../components/FormProduct.vue";
import { useQuery } from "@tanstack/vue-query";
import { getProductDetail } from "@/services/product.service";
import { inject } from "vue";

const { showLoader, hideLoader } = inject('loader');

const { params } = useRoute();

const { data, isLoading } = useQuery({
  queryKey: [QK_PRODUCT_DETAIL, params?.id],
  queryFn: async ({ queryKey }) => {
    const params = queryKey?.[1];
    showLoader()
    const response = await getProductDetail(params)
    hideLoader()
    return response
  },
  gcTime: 0,
  throwOnError: hideLoader
})
</script>

<template>
  <ProtectLayout>
    <FormProduct :data="data" />
  </ProtectLayout>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>