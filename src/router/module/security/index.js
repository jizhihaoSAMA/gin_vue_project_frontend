const secRoutes = [
    {
        path: '/security/change_telephone',
        name: 'change_telephone',
        component: () => import("@/views/user/security/change_telephone")

    }, {
        path: '/security/change_email',
        name: 'change_email',
        component: () => import("@/views/user/security/change_email")
    }
]

export default secRoutes