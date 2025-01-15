import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ProductsView from "../views/ProductsView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  { path: "/login", name: "login", component: LoginView },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
