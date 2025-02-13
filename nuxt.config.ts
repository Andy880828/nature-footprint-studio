// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['@/assets/css/tailwind.css'],
    future: {
        compatibilityVersion: 4,
    },

    devtools: { enabled: true },
    modules: ['@nuxt/ui', 'nuxt-aos', '@nuxtjs/tailwindcss', '@nuxtjs/sitemap'],

    site: {
        url: 'https://nature-footprint-studio.vercel.app',
        name: '話蛇添足工作室',
    },

    app: {
        head: {
            title: '話蛇添足工作室',
            meta: [
                {
                    name: 'description',
                    content:
                        '一起探索自然的饋贈，提供生態專業服務，包括兩棲爬蟲、魚類、十足類、鳥類相關的生態課程，也提供生態調查及夜間導覽服務，歡迎進入網頁參訪',
                },
                {
                    property: 'og:title',
                    content: '話蛇添足工作室',
                },
                {
                    property: 'og:description',
                    content:
                        '一起探索自然的饋贈，提供生態專業服務，包括兩棲爬蟲、魚類、十足類、鳥類相關的生態課程，也提供生態調查及夜間導覽服務，歡迎進入網頁參訪',
                },
                { name: 'robots', content: 'index, follow' },
                {
                    property: 'og:image',
                    content: '/landing.webp',
                },
                {
                    property: 'og:image:width',
                    content: '1200',
                },
                {
                    property: 'og:image:height',
                    content: '630',
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
                {
                    name: 'twitter:card',
                    content: 'summary_large_image',
                },
                {
                    name: 'twitter:image',
                    content: '/landing.webp',
                },
                { name: 'author', content: '話蛇添足工作室' },
                {
                    name: 'keywords',
                    content: '生態調查,環境教育,兩棲爬蟲,魚類,十足類,鳥類,夜間導覽,自然教育,生態工作室',
                },
                { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
                { name: 'google', content: 'notranslate' },
                {
                    name: 'robots',
                    content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
                },
            ],
            link: [{ rel: 'canonical', href: 'https://nature-footprint-studio.vercel.app' }],
        },
    },

    runtimeConfig: {
        public: {
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseKey: process.env.SUPABASE_KEY,
            supabaseServiceKey: process.env.SERVICE_KEY,
        },
    },

    compatibilityDate: '2025-01-16',
});
