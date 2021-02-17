const newsRoutes = [
    {
        path: '/news/type/:news_type',
        name: 'news_type',
        component: () => import("@/views/page_template/news_list")

    }, {
        path: '/news/:news_id',
        name: 'news',
        component: () => import("@/views/page_template/news_template"),
        children: [{
            name: "comment",
            path: ':comment_id',
            component: () => import("@/views/page_template/news_template")
        }]
    }
]

export default newsRoutes