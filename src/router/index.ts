// src/router/index.js
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import { useAuthStore } from "@/stores/auth.store";

import {
  ROUTE_DASHBOARD,
  ROUTE_LOGIN,
  ROUTE_PRODUCT,
  ROUTE_PRODUCT_CREATE,
  ROUTE_PRODUCT_UPDATE,
} from "@/constants/route.constant";

import Login from "@/pages/Login/index.vue";
import Dashboard from "@/pages/Dashboard/index.vue";

import Product from "@/pages/Product/index.vue";
import CreateProduct from "@/pages/Product/forms/CreateProduct.vue";
import UpdateProduct from "@/pages/Product/forms/UpdateProduct.vue";

const routes: RouteRecordRaw[] = [
  {
    path: ROUTE_LOGIN,
    name: "Login",
    component: Login,
    meta: {
      type: "public",
    },
  },
  {
    path: ROUTE_DASHBOARD,
    name: "Dashboard",
    component: Dashboard,
    meta: {
      type: "private",
    },
  },
  {
    path: ROUTE_PRODUCT,
    name: "Product",
    component: Product,
    meta: {
      type: "private",
    },
  },
  {
    path: ROUTE_PRODUCT_CREATE,
    name: "Create Product",
    component: CreateProduct,
    meta: {
      type: "private",
    },
  },
  {
    path: ROUTE_PRODUCT_UPDATE,
    name: "Update Product",
    component: UpdateProduct,
    meta: {
      type: "private",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore();
  const isLoggedIn = !!auth.token;
  if (!isLoggedIn && to?.meta?.type === "private") {
    next("/");
  } else if (isLoggedIn && to?.meta?.type === "public") {
    next("/dashboard");
  }
  next();
});

export default router;
