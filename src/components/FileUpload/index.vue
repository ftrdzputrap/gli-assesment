<template>
  <div class="w-full">
    <div class="flex items-center space-x-4">
      <label class="flex-1 relative cursor-pointer hover:bg-gray-100 text-gray-700 rounded-lg px-4 py-2 border border-dashed border-gray-300 transition duration-200">
        <span class="truncate block">
          {{ model?.name || model || 'Choose a file...' }}
        </span>
        <input
          type="file"
          @change="handleFileChange"
          class="absolute inset-0 opacity-0 cursor-pointer"
          :multiple="false"
        />
      </label>
    </div>

    <div v-if="uploadStatus" class="mt-4 text-sm text-green-600">
      {{ uploadStatus }}
    </div>
  </div>
</template>


<script setup>
import { postFile } from '@/services/file.service';
import { useMutation } from '@tanstack/vue-query';
import { inject, ref, watch } from 'vue'

const {showLoader, hideLoader} = inject('loader');

const model = defineModel();
const doUpdate = useMutation({ mutationFn: postFile })

const uploadStatus = ref('')

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    model.value = file
    uploadStatus.value = ''

    uploadFile(file)
  }
}

const uploadFile = async (file = model.value) => {
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  showLoader();
  doUpdate.mutate(formData, {
    onSuccess: (data) => {
      model.value = data?.location;
      uploadStatus.value = response.ok
        ? 'File uploaded successfully!'
        : 'Upload failed.'
    },
    onSettled: hideLoader
  })
}
</script>

<style scoped>
.file-upload {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
}

.custom-file-input {
  position: relative;
  display: inline-block;
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.custom-file-input input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

button {
  padding: 0.5rem 1rem;
  background-color: #2d8cf0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.status {
  font-size: 14px;
  color: #333;
}
</style>
