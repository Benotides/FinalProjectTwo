import { createRouter, createWebHistory } from "vue-router";
import AuthView from "@/views/AuthView.vue";
import HomeView from "@/views/HomeView.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import user from "../stores/user";

const routes = [
  {
    path: "/",
    redirect: "/auth",
  },
  {
    path: "/auth",
    component: AuthView,
    children: [
      {
        path: "",
        component: SignIn,
      },
      {
        path: "signup",
        component: SignUp,
      },
    ],
  },
  {
    path: "/home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = Boolean(user.user)
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated) {
    next('/auth')
  } else {
    next()
  }
})

export default router;
