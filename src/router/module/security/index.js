const secRoutes = [
    {
        path: '/security',
        name: 'security',
        component: { template: `<router-view></router-view>` },
        children: [
            {
                path: 'change_telephone',
                name: 'change_telephone',
                component: () => import("@/views/user/security/change_telephone")

            }, {
                path: 'change_email',
                name: 'change_email',
                component: () => import("@/views/user/security/change_email")

            }
        ],
        // auth: {
        //     username: name,
        //     password: name
        // }
    }
]

export default secRoutes