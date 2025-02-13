// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['@/assets/css/tailwind.css'],
    future: {
        compatibilityVersion: 4,
    },

    devtools: { enabled: true },
    modules: ['@nuxt/ui', 'nuxt-aos', '@nuxtjs/tailwindcss'],

    app: {
        head: {
            title: '話蛇天足工作室',
            meta: [
                {
                    name: 'description',
                    content:
                        '一起探索自然的饋贈，提供生態專業服務，包括兩棲爬蟲、魚類、十足類、鳥類相關的生態課程，也提供生態調查及夜間導覽服務，歡迎進入網頁參訪',
                },
                {
                    property: 'og:title',
                    content: '話蛇天足工作室',
                },
                {
                    property: 'og:description',
                    content:
                        '一起探索自然的饋贈，提供生態專業服務，包括兩棲爬蟲、魚類、十足類、鳥類相關的生態課程，也提供生態調查及夜間導覽服務，歡迎進入網頁參訪',
                },
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
            ],
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
