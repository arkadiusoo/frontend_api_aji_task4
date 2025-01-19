import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ProductsView from "../views/ProductsView.vue";
import CartView from "../views/CartView.vue";
import OrdersView from "../views/OrdersView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },

  { path: "/login", name: "login", component: LoginView },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
  },
  { path: "/cart", name: "cart", component: CartView },
  { path: "/orders", name: "orders", component: OrdersView },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
