<script setup>
import bg1 from '~/assets/images/bg-section-1.jpg';
import bgLeaf from '~/assets/images/leaf.svg';
import business1 from '~/assets/images/business-1.webp';
import business2 from '~/assets/images/business-2.webp';
import business3 from '~/assets/images/business-3.webp';
import business4 from '~/assets/images/business-4.webp';
import bgFaq from '~/assets/images/bg-faq.webp';

definePageMeta({
    layout: 'landing-page',
});
// 最新消息
// 利用我們寫好的Composable抓取API資料
const supabase = useSupabase();
// fetch消息
const { data: news } = await supabase.from('news').select('*').limit(5);
const orderedNews = computed(() => {
    return [...news].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA; // 降序排列，最新的在前面
    });
});

const businesses = ref([
    {
        image: business1,
        icon: 'i-material-symbols-school',
        title: '蛇類介紹課程',
        description:
            '透過完整的蛇類介紹，深入了解不同蛇種的特性、習性及正確的互動方式，希望幫助大家破除對蛇類的誤解，重新認識這群看似可怕但其實可愛又呆萌的物種，學會以正確方式與牠們共存。',
        isOpen: false,
    },
    {
        image: business2,
        icon: 'i-solar-magnifer-bug-linear',
        title: '夜間生態導覽',
        description:
            '透過夜間探索活動，學習在適當的時間與地點發現野生動物，體驗課本與電視以外的真實自然世界，並掌握尋找與辨識動物的技巧，讓你不再錯過藏匿於細節中的驚喜。',
        isOpen: false,
    },
    {
        image: business3,
        icon: 'i-mingcute-mountain-2-fill',
        title: '田野生態調查',
        description:
            '實地考察自然環境，記錄並研究生態。從大學自學兩棲爬蟲開始，到碩班專注於水域生態調查，透過多年的野外經驗累積，帶領大家逐步掌握陸域與水域生態調查的全方位技能。',
        isOpen: false,
    },
    {
        image: business4,
        icon: 'i-mdi-snake',
        title: '球蟒飼養販售',
        description:
            '結合七年經驗，從球蟒的色彩變化到飼養心得，帶你認識這種安靜且吸引人的小夥伴，幫助新手輕鬆入門，也讓球蟒不僅是陪伴的寵物，也是和人分享交流的橋樑。',
        isOpen: false,
    },
]);

// 常見問題列表
const faqItems = [
    {
        label: '如何預約課程或活動？',
        icon: 'i-material-symbols-calendar-month',
        content: '您可以透過網站的工作詢問聯繫進行預約。建議提前至少兩週預約，以確保有適合的時段。',
    },
    {
        label: '活動有年齡限制嗎？',
        icon: 'i-material-symbols-child-care',
        content: '活動基本上沒有年齡限制，但一般戶外活動(如:夜間生態導覽)建議七歲以上孩童參加，建議您在預約時詢問。',
    },
    {
        label: '需要準備什麼裝備？',
        icon: 'i-material-symbols-backpack',
        content:
            '室內課程無需擔心，戶外活動則建議穿著長袖衣物、長褲及運動鞋，並攜帶水壺。具體準備物品清單會在活動確認後提供。',
    },
    {
        label: '戶外活動遇到下雨天怎麼辦？',
        icon: 'i-material-symbols-rainy',
        content: '若遇到大雨或不適合進行活動的天氣會提前通知並協助改期或退費。小雨則會視情況調整活動內容。',
    },
    {
        label: '可以攜帶寵物參加活動嗎？',
        icon: 'i-material-symbols-pets',
        content: '為了確保活動品質及安全，一般活動不建議攜帶寵物。如有特殊需求，請先與我們聯繫討論。',
    },
    {
        label: '球蟒應該如何訂購？',
        icon: 'i-material-symbols-pets',
        content: '球蟒的購買請直接聯繫並告知編號，後續將進行議價與交貨方式確認。',
    },
];
</script>

<template>
    <!-- 最新消息 -->
    <section :style="{ backgroundImage: `url(${bg1})` }" class="relative py-20 overflow-hidden bg-cover bg-center z-0">
        <div class="absolute inset-0 bg-white opacity-80 z-[1]"></div>
        <div class="relative container px-4 mx-auto z-[2]">
            <div class="max-w-2xl mx-auto mb-4 text-center">
                <p class="text-5xl font-bold flex items-center justify-center gap-2 pe-5">
                    <UIcon name="i-mingcute-news-fill" class="size-12" />最新消息
                </p>
            </div>
            <div class="max-w-5xl mx-auto">
                <div
                    v-for="(news, idx) in orderedNews"
                    :key="idx"
                    class="py-4 px-4 rounded-xl hover:bg-gray-50/50 transition-colors duration-300 group"
                >
                    <div class="flex items-center gap-4">
                        <div class="shrink-0">
                            <img
                                :src="news.picture"
                                class="w-28 h-24 sm:w-36 sm:h-30 object-cover rounded-lg hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                                alt="news-picture"
                            />
                        </div>
                        <div class="flex-1 min-w-0">
                            <div>
                                <span class="block text-gray-400 mb-1">
                                    {{ new Date(news.created_at).toLocaleDateString('zh-TW') }}
                                </span>
                                <p
                                    class="text-lg sm:text-2xl font-semibold text-gray-900 line-clamp-2 group-hover:text-green-700 transition-colors duration-300"
                                >
                                    {{ news.title }}
                                </p>
                                <p class="text-sm sm:text-base text-gray-500 mt-2 line-clamp-2">
                                    {{ news.brief }}
                                </p>
                            </div>
                        </div>
                        <div class="shrink-0">
                            <a
                                class="inline-flex items-center text-base sm:text-xl font-semibold text-green-900 hover:text-gray-900 whitespace-nowrap"
                                href="#"
                            >
                                <span class="mr-1">閱讀更多</span>
                                <UIcon name="i-material-symbols-arrow-outward" class="size-5 sm:size-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pt-6 text-center">
                <NuxtLink
                    class="relative group inline-block py-4 px-7 font-semibold text-green-900 hover:text-white rounded-xl shadow-sm bg-white transition duration-300 overflow-hidden"
                    to="/news"
                >
                    <div
                        class="absolute top-0 right-full size-full bg-green-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"
                    ></div>
                    <span class="relative">所有消息</span>
                </NuxtLink>
            </div>
        </div>
    </section>
    <!-- 跑馬燈 -->
    <div class="relative flex overflow-x-hidden bg-green-700 text-white">
        <div class="py-4 animate-marquee whitespace-nowrap">
            <span class="text-4xl mx-6 tracking-[1.2rem]"
                ><UIcon name="i-material-symbols-eco" class="size-10 mr-8" /> 自然探索</span
            >
            <span class="text-4xl mx-6 tracking-[1.2rem]"
                ><UIcon name="i-material-symbols-eco" class="size-10 mr-8" /> 環境教育</span
            >
            <span class="text-4xl mx-6 tracking-[1.2rem]"
                ><UIcon name="i-material-symbols-eco" class="size-10 mr-8" /> 物種觀察</span
            >
            <span class="text-4xl mx-6 tracking-[1.2rem]"
                ><UIcon name="i-material-symbols-eco" class="size-10 mr-8" /> 生態足跡</span
            >
            <span class="text-4xl mx-6 tracking-[1.2rem]"
                ><UIcon name="i-material-symbols-eco" class="size-10 mr-8" /> 守護家園</span
            >
        </div>
        <div class="absolute top-0 py-4 animate-marquee2 whitespace-nowrap">
            <span class="text-4xl mx-6 tracking-[1.2rem]"
                ><UIcon name="i-material-symbols-eco" class="size-10 mr-8" /> 自然探索</span
            >
            <span class="text-4xl mx-6 tracking-[1.2rem]"
                ><UIcon name="i-material-symbols-eco" class="size-10 mr-8" /> 環境教育</span
            >
            <span class="text-4xl mx-6 tracking-[1.2rem]"
                ><UIcon name="i-material-symbols-eco" class="size-10 mr-8" /> 物種觀察</span
            >
            <span class="text-4xl mx-6 tracking-[1.2rem]"
                ><UIcon name="i-material-symbols-eco" class="size-10 mr-8" /> 生態足跡</span
            >
            <span class="text-4xl mx-6 tracking-[1.2rem]"
                ><UIcon name="i-material-symbols-eco" class="size-10 mr-8" /> 守護家園</span
            >
        </div>
    </div>
    <!-- 業務簡單介紹 -->
    <section class="py-20 relative z-0 overflow-hidden">
        <img :src="bgLeaf" class="absolute size-96 z-[1] -right-20 -bottom-10" />
        <img :src="bgLeaf" class="absolute size-96 z-[1] -left-20 rotate-180 -top-10" />
        <div class="max-w-2xl mx-auto mb-4 text-center">
            <p class="text-5xl font-bold flex items-center justify-center gap-2 pe-5">
                <UIcon name="i-material-symbols-work" class="size-12" />業務介紹
            </p>
        </div>
        <div
            class="mt-10 container px-4 mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 justify-center items-center relative z-[2]"
        >
            <div
                v-for="(business, index) in businesses"
                :key="index"
                class="rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
                <div class="h-[300px] relative overflow-hidden">
                    <img
                        :src="business.image"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        :alt="business.title"
                    />
                </div>
                <div class="p-4 bg-green-700/80 flex flex-col items-center gap-2">
                    <UIcon :name="business.icon" class="size-20 text-zinc-100" />
                    <span class="text-3xl font-semibold text-zinc-100">{{ business.title }}</span>
                    <button
                        @click="business.isOpen = !business.isOpen"
                        class="text-white hover:text-green-900 transition-colors duration-300"
                    >
                        <UIcon
                            :name="
                                business.isOpen ? 'i-material-symbols-expand-less' : 'i-material-symbols-expand-more'
                            "
                            class="size-8"
                        />
                    </button>
                    <div v-show="business.isOpen" class="text-white text-pretty transition-all duration-300">
                        {{ business.description }}
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- 常見問題 -->
    <section class="bg-[#EDF6EE]">
        <div class="grid grid-cols-1 lg:grid-cols-2">
            <!-- 左側圖片 -->
            <div class="relative h-full overflow-hidden">
                <img :src="bgFaq" class="absolute inset-0 w-full h-full object-cover" />
            </div>
            <!-- 右側常見問題 -->
            <div class="p-10 md:p-20">
                <div class="mb-8">
                    <p class="text-5xl font-bold flex items-center justify-center gap-2 pe-5">
                        <UIcon name="i-material-symbols-quiz" class="size-12" />常見問題
                    </p>
                </div>
                <div class="space-y-4">
                    <UAccordion
                        :items="faqItems"
                        :ui="{
                            wrapper: 'flex flex-col w-full',
                            item: {
                                base: 'overflow-hidden',
                                padding: 'p-4',
                                size: 'text-lg',
                                trigger:
                                    'p-4 w-full flex items-center gap-2 text-left bg-white hover:bg-gray-50 rounded-lg',
                                panel: 'p-4 text-gray-600 bg-white/80 rounded-lg mt-2',
                            },
                        }"
                    >
                        <template #default="{ item, index, open }">
                            <UButton
                                color="gray"
                                variant="ghost"
                                class="border-b border-gray-200"
                                :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
                            >
                                <template #leading>
                                    <div
                                        class="size-8 rounded-full bg-green-700 flex items-center justify-center -my-1"
                                    >
                                        <UIcon :name="item.icon" class="size-5 text-white" />
                                    </div>
                                </template>

                                <span class="truncate text-xl">{{ index + 1 }}. {{ item.label }}</span>

                                <template #trailing>
                                    <UIcon
                                        name="i-heroicons-chevron-right-20-solid"
                                        class="w-5 h-5 ms-auto transform transition-transform duration-200"
                                        :class="[open && 'rotate-90']"
                                    />
                                </template>
                                <template #item>
                                    <p class="text-lg">
                                        {{ item.label }}
                                    </p>
                                </template>
                            </UButton>
                        </template>
                    </UAccordion>
                </div>
            </div>
        </div>
    </section>
    <!-- 商品 -->
</template>

<style lang="css" scoped></style>
