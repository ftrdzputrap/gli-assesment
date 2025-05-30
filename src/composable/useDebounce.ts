import { ref, watch, onUnmounted } from "vue";

const useDebounce = (initialValue = "", delay = 1000) => {
  const value = ref(initialValue);
  const debouncedValue = ref(initialValue);
  let timeoutId: number | null = null;

  watch(value, (newValue) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      debouncedValue.value = newValue;
    }, delay);
  });

  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });

  return [value, debouncedValue];
};

export default useDebounce;