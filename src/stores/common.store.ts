import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", {
  state: () => ({ isOpen: false }),
  actions: {
    setIsOpen(isOpen: boolean) {
      this.isOpen = isOpen;
    },
  },
});
