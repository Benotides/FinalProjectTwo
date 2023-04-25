import { createRouter, createWebHistory } from "vue-router";
import AuthView from "@/views/AuthView.vue";
import HomeView from "@/views/HomeView.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import UserStore from "../stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: 'home',
      component: HomeView,
      
    },
    {
    path: "/auth",
    name:'auth',
    component: AuthView,
    children: [
      {
        path: "",
        name:'signIn',
        component: SignIn,
      },
      {
        path: "signup",
        name: 'signUp',
        component: SignUp,
      },
    ],
  },
 
]
})



// router.beforeEach((to) => {
// const useUserStore = UserStore()
//  const isLoginIn = useUserStore.user != null;

//  if (!isLoginIn && to.name != 'signIn' && to.name != 'signUp') {
//   return {name: 'signIn'}
//  }
// })
 

export default router;
