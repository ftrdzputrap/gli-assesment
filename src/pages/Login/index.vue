<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onSignIn">
        <div class="rounded-md shadow-sm p-4 bg-white space-y-2">
          <InputForm name="email" label="Email" type="email" />
          <InputForm name="password" label="Password" type="password" />
          <!-- <div>
            <label for="email" class="sr-only">Email address</label>
            <input id="email" v-model="email" name="email" type="email" required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" v-model="password" name="password" type="password" required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password" />
          </div> -->
          <div class="mt-8">
            <button type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import router from '@/router';
import { signIn } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import InputForm from '@/components/Form/InputForm.vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';

const loader = inject('loader');

const { handleSubmit, values, errors, defineField, resetForm, setFieldValue } = useForm({
  validationSchema: yup.object({
    email: yup.string().email("Email is not valid").required('Email is required'),
    password: yup.string().required('Password is required')
  }),
  initialValues: {
    email: 'john@mail.com',
    password: 'changeme'
  },
});

const store = useAuthStore();

const onSignIn = handleSubmit(async (values) => {
  try {
    loader.showLoader();
    const response = await signIn(values);
    store.setToken(response?.access_token);
    router.push('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
  } finally {
    loader.hideLoader();
  }
})

</script>
