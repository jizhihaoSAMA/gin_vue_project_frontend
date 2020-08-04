const newsRoutes = [
    {
        path: '/news/:news_type',
        name: 'news_type',
        component: () => import("@/views/page_template/news_list")

    }, {
        path: '/news',
        name: 'news',
        component: () => import("@/views/page_template/news_template")
    }
]

export default newsRoutes