import Main from "../views/Main.vue";
import HeatingCalc from "../views/HeatingCalc.vue";
import SnowLoads from "../views/SnowLoads.vue";
import WindLoads from "../views/WindLoads.vue";
import PageNotFound from "../views/PageNotFound.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Main,
    meta: { title: "Арка - архитектурные и строительные расчёты" },
  },
  {
    path: "/heat",
    component: HeatingCalc,
    meta: { title: "Теплотехнический расчёт · Арка" },
  },
  {
    path: "/snow",
    component: SnowLoads,
    meta: { title: "Снеговая нагрузка · Арка" },
  },
  {
    path: "/wind",
    component: WindLoads,
    meta: { title: "Ветровая нагрузка · Арка" },
  },
  {
    path: "/:pathMatch(.*)*",
    component: PageNotFound,
    meta: { title: "Страница не найдена · Арка" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
