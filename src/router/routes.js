import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/home/home.vue'
import User from '../pages/user/User.vue'
import Account from '../pages/user/views/Account.vue'

const routes = [
    {path: "/", name : "Home", component: Home},
    {path: "/user", name : "User", component: User, children: [
        {path : "", name: "Account", component: Account}
    ]}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;