const newsRoutes = [
    {
        path: '/news/:news_type',
        name: 'news',
        component: () => import("@/views/page_template/news_list")
    }
]

export default newsRoutes