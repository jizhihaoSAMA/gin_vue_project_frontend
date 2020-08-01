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
        name: 'profile',
        meta: {
            // 需要认证才能进入
            auth: {
                username: name,
                password: name
            }
        },
        component: () => import("@/views/user/profile.vue")
    }
]

export default userRoutes