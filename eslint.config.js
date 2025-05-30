import vue from 'eslint-plugin-vue';
export default [
  {
    plugins: {
      vue: vue,
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-essential',
      '@vue/eslint-config-standard'
    ],
    rules: {
      // Add or override rules here
    },
  },
];