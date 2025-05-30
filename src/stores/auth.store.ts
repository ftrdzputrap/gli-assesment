import { defineStore } from "pinia";

interface IAuth {
  token?: string;
}

export const useAuthStore = defineStore<string, IAuth>("auth", {
  state: () => ({ token: "" }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
  },
  persist: true,
});
