import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({ props: {} }),
  actions: {
    setProps(props: string) {
      this.props = props;
    },
  },
});
