// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    future: {
        compatibilityVersion: 4,
    },

    devtools: { enabled: true },
    modules: ['@nuxt/ui', 'nuxt-swiper'],

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
                    name: 'og:title',
                    content: '話蛇天足工作室',
                },
                {
                    name: 'og:description',
                    content:
                        '一起探索自然的饋贈，提供生態專業服務，包括兩棲爬蟲、魚類、十足類、鳥類相關的生態課程，也提供生態調查及夜間導覽服務，歡迎進入網頁參訪',
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