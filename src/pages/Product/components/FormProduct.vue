<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { inject, useAttrs, watch, toRaw, toRefs, toRef } from 'vue';
import router from '@/router';

import { useMutation, useQuery } from '@tanstack/vue-query';
import { getCategory } from '@/services/category.service';
import { postProduct, putProduct } from '@/services/product.service';

import SelectCategory from "@/components/Select/Category/index.vue";
import FileUpload from "@/components/FileUpload/index.vue";
import InputForm from '@/components/Form/InputForm.vue';
import ModalSubmitConfirmation from './ModalSubmitConfirmation.vue';

const attrs = useAttrs();
const props = defineProps({
  data: {
    type: Object,
  }
})

const detail = toRef(() => props?.data);

const { showLoader, hideLoader } = inject('loader');
const { openModal, closeModal } = inject('modal');

const doPost = useMutation({ mutationFn: postProduct });
const doPut = useMutation({ mutationFn: (payload) => putProduct(detail?.value?.id, payload) });

const defaultValues = {
  title: "",
  slug: "",
  price: "",
  description: "",
  category: null,
  images: []
};

const schema = yup.object({
  title: yup.string().required('Title is required'),
  slug: yup.string().required('Slug is required'),
  price: yup.string().required('Price is required').min(0, 'Price must be positive'),
  description: yup.string().required('Description is required'),
  category: yup.mixed().required('Category is required'),
  images: yup.array().of(yup.string().required()).min(1, 'At least one image is required')
});

const { handleSubmit, values, errors, defineField, resetForm } = useForm({
  validationSchema: schema,
  initialValues: defaultValues,
});

const [images] = defineField('images');

const { data: categories, isLoading: isLoadingCategories } = useQuery({
  queryKey: ['categories'],
  queryFn: getCategory
});

const onConfirmSubmit = handleSubmit((values) => {
  openModal(ModalSubmitConfirmation, { onSubmit, props: values });
});

const onSubmit = (values) => {
  showLoader();
  const service = detail?.value?.id ? doPut : doPost
  service.mutate({
    ...values,
    images: values?.images?.map(image => image?.name ? image?.name : image),
    categoryId: values?.category?.id
  }, {
    onSuccess: () => {
      closeModal();
      router.back();
      queryClient.invalidateQueries({
        predicate: (query) => query?.queryKey[0] === QK_PRODUCT
      })
    },
    onSettled: hideLoader
  });
};

watch(
  detail,
  () => {
    if (detail?.value?.id) {
      resetForm({ values: detail.value })
    }
  },
);

</script>

<template>
  <div class="min-h-screen bg-gray-50 ">
    <div class="mx-auto bg-white shadow-md rounded-lg p-8 space-y-8">

      <form @submit.prevent="onConfirmSubmit" class="space-y-6">
        <InputForm name="title" label="Title" />
        <InputForm name="slug" label="Slug" />
        <InputForm name="price" label="Price" />
        <InputForm name="description" label="Description" />
        <SelectCategory name="category" label="Category" />

        <!-- Image Upload Section -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Images</label>

          <div class="space-y-3">
            <div v-for="(image, index) in images" :key="index" class="flex items-center gap-3">
              <FileUpload v-model="images[index]" class="flex-1" />
              <button type="button" @click="images.splice(index, 1)" class="text-sm text-red-600 hover:underline">
                Remove
              </button>
            </div>
            <button type="button" @click="images.push('')" class="text-sm text-indigo-600 hover:underline">
              + Add Image
            </button>
          </div>

          <p v-if="errors.images" class="text-sm text-red-500">
            {{ errors.images }}
          </p>
        </div>

        <!-- Submit Button -->
        <div class="flex items-center gap-2 text-right justify-end">
          <button type="button" @click="router.back()"
            class="inline-block bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
            Cancel
          </button>
          <button type="submit"
            class="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<!-- <template>
  <Test />
  <div class="container mx-auto p-6">
    <form @submit="onSubmit" class="max-w-2xl mx-auto space-y-6">
      <div class="space-y-4">

        <InputForm name="title" label="Title" />
        <InputForm name="slug" label="Slug" />
        <InputForm name="price" label="Price" />
        <InputForm name="description" label="Description" />
        <SelectCategory name="category" label="Category" />

        <div>
          <label class="block text-sm font-medium text-gray-700">Images</label>
          <div class="mt-1 space-y-2">
            <div v-for="(image, index) in images" :key="index" class="flex gap-2">
              <FileUpload v-model="images[index]" class="w-full" />
              <button type="button" @click="images.splice(index, 1)" class="px-3 py-2 text-red-600 hover:text-red-800">
                Remove
              </button>
            </div>
            <button type="button" @click="images.push('')"
              class="mt-2 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800">
              Add Image
            </button>
          </div>
          <span v-if="errors.images" class="text-red-500 text-sm">{{ errors.images }}</span>
        </div>
      </div>

      <div class="flex justify-end">
        <button type="submit"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Submit
        </button>
      </div>
    </form>
  </div>
</template> -->
