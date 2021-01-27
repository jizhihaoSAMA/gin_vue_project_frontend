const userRoutes = [
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/user/register.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/user/login.vue"),
    },
    {
        path: '/profile',
        name: 'user_profile',
        meta: {
            // 需要认证才能进入
            auth: {
                username: name,
                password: name
            }
        },
        component: () => import("@/views/user/profile.vue")
    },
    {
        path: '/user/:user_id',
        name: 'user_page',
        component: () => import("@/views/user/user_page.vue")
    }
]

export default userRoutes