import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);


// 导出路由
export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/register/register.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import("../views/login/login.vue"),
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import("../views/user/profile.vue")
        }
    ]
});