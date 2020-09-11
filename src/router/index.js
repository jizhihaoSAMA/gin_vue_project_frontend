import Vue from "vue"
import VueRouter from "vue-router"
import userRoutes from "./module/user"
import newsRoutes from "./module/news"
import store from "@/store"

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "index",
            component: () => import("@/views/page_template/index.vue")
        },
        {
            path: "*",
            name: "notFound",
            component: () => import("@/views/page_template/notFound.vue")
        },
        ...userRoutes,
        ...newsRoutes,
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.auth) { // 判断该路由的auth
        // 判断是否登录

        // 此处判断token 是否存在
        if (store.state.userModule.token) {
            // 此处应该还要判断token是否有效， 比如是否过期， 需要后台发放token的时候 带上token的有效期
            // 如果token无效， 还需要请求token。
            next()
        } else {
            //没有登录，跳转登录页面
            router.push({ name: 'login' })
        }
    } else {
        next()
    }
})

// 导出路由
export default router