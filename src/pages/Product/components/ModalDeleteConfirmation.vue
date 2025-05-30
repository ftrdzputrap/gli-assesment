<script setup>
import { QK_PRODUCT } from "@/constants/query-key.constant";
import router from "@/router";
import { deleteProduct } from "@/services/product.service";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { inject, useAttrs } from "vue";

const { closeModal } = inject('modal');
const { showLoader, hideLoader } = inject('loader');

const { args } = useAttrs();
const queryClient = useQueryClient();

const doDelete = useMutation({ mutationFn: (id) => deleteProduct(id) })

const handleDelete = () => {
  showLoader();
  doDelete.mutate(args?.id, {
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({
        predicate: (query) => query?.queryKey[0] === QK_PRODUCT
      })
    },
    onSettled: hideLoader
  })
}
</script>

<template>
  <div class="modal-header">
    <h2 class="modal-title">Delete Confirmation</h2>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete this item? This action cannot be undone.</p>
  </div>
  <div class="modal-footer">
    <button class="btn btn-secondary" @click="closeModal">Cancel</button>
    <button class="btn btn-danger" @click="handleDelete">Delete</button>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
}

.modal-header {
  margin-bottom: 20px;
}

.modal-title {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.modal-body {
  margin-bottom: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-secondary {
  background-color: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background-color: #cbd5e0;
}

.btn-danger {
  background-color: #dc2626;
  color: white;
}

.btn-danger:hover {
  background-color: #b91c1c;
}
</style>