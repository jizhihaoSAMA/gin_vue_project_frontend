import Vue from "vue"
import VueRouter from "vue-router"
import userRoutes from "./module/user"
import store from "@store"

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...userRoutes
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.auth) { // 判断该路由的auth
        // 判断是否登录
        if (store.state.userModule.token) {
            // 判断token是否有效
            next()
        } else {
            //没有登录，跳转登录页面
            router.push({ name: ' login' })
        }
    } else {
        next()
    }
})

// 导出路由
export default router