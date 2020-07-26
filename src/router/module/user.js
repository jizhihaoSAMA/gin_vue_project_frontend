const userRoutes = [
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/register/register.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/login/login.vue"),
    },
    {
        path: '/profile',
        name: 'profile',
        meta: {
            auth: {
                username: name,
                password: name
            }
        },
        component: () => import("@/views/user/profile.vue")
    }
]

export default userRoutes