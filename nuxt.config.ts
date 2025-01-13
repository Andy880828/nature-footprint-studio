// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss'],
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
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
                },
            ],
        },
    },
});
