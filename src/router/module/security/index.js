const secRoutes = [
    {
        path: '/security',
        name: 'security',

        component: {
            template: `<router-view></router-view>`
        },
        children: [
            {
                path: 'bindTelephone',
                name: 'bindTelephone',
                component: () => import("@/views/user/security/change_telephone"),
                meta: {
                    auth: true,
                },

            }, {
                path: 'bindEmail',
                name: 'bindEmail',
                component: () => import("@/views/user/security/change_email"),
                meta: {
                    auth: true,
                },
            }
        ],

    }
]


export default secRoutes