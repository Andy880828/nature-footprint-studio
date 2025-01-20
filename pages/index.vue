<script setup>
import bg1 from '~/assets/images/bg-section-1.jpg';
definePageMeta({
    layout: 'landing-page',
});
// 最新消息
const containerRef = ref(null);
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
//
const swiper = useSwiper(containerRef);
</script>

<template>
    <!-- 最新消息 -->
    <section :style="{ backgroundImage: `url(${bg1})` }" class="relative py-12 overflow-hidden bg-cover bg-center z-0">
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
                    class="py-6 px-4 rounded-xl hover:bg-gray-50/50 transition-colors duration-300 group"
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
                    class="relative group inline-block py-4 px-7 font-semibold text-green-900 hover:text-green-50 rounded-full bg-green-50 transition duration-300 overflow-hidden"
                    to="/news"
                >
                    <div
                        class="absolute top-0 right-full w-full h-full bg-green-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"
                    ></div>
                    <span class="relative">所有消息</span>
                </NuxtLink>
            </div>
        </div>
    </section>
    <!-- 跑馬燈 -->
    <div class="relative flex overflow-x-hidden bg-[#78B900] text-white">
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
    <div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 justify-center items-center p-4">
            <div class="flex flex-col gap-4 items-center justify-center p-6 bg-white/50 rounded-lg shadow-lg">
                <UIcon name="i-material-symbols-school" class="size-20" />
                <span class="text-3xl font-bold">生態課程</span>
            </div>
            <div class="flex flex-col gap-4 items-center justify-center p-6 bg-white/50 rounded-lg shadow-lg">
                <UIcon name="i-solar-magnifer-bug-linear" class="size-20" />
                <span class="text-3xl font-bold">生態導覽</span>
            </div>
            <div class="flex flex-col gap-4 items-center justify-center p-6 bg-white/50 rounded-lg shadow-lg">
                <UIcon name="i-mingcute-mountain-2-fill" class="size-20" />
                <span class="text-3xl font-bold">田野調查</span>
            </div>
        </div>
    </div>
    <!-- 常見問題 -->
    <!-- 商品 -->
</template>

<style lang="css" scoped></style>
