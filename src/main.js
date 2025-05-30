import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { VueQueryPlugin } from '@tanstack/vue-query';

import App from './App.vue';
import router from './router';

import './assets/main.css'

const pinia = createPinia()
const app = createApp(App);

pinia.use(createPersistedState({
  storage: localStorage,
}))

app.use(pinia);
app.use(router);

const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  },
}
app.use(VueQueryPlugin, vueQueryPluginOptions)

app.mount('#app');