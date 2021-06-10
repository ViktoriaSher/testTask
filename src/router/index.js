import {
  createRouter,
  createWebHistory
} from "vue-router";
import ListOfCurrencies from "../views/ListOfCurrencies.vue";

const routes = [{
    path: "/",
    name: "ListOfCurrencies",
    component: ListOfCurrencies,
  },
  {
    path: "/converter",
    name: "Converter",
    component: () =>
      import("../views/Converter.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;