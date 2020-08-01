const newsRoutes = [
    {
        path: '/news/:news_type',
        name: 'news',
        component: {
            template: `
            <div>这里是{{ $route.params.news_type }}</div>
            `
        },
    }
]

export default newsRoutes