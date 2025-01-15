<script setup>
import bg1 from '~/assets/images/bg-section-1.jpg';
definePageMeta({
    layout: 'landing-page',
});
// 利用我們寫好的Composable抓取API資料
const supabase = useSupabaseClient();
// 取得最新消息
const { data: news, error } = await supabase.from('news').select('*');
console.log(news);
</script>

<template>
    <!-- 最新消息 -->
    <div :style="{ backgroundImage: `url(${bg1})` }" class="relative w-full min-h-screen bg-cover bg-center z-0">
        <div class="absolute inset-0 bg-white opacity-80 z-[1]"></div>
        <div class="relative container mx-auto py-20 z-10 flex flex-col gap-4 items-center">
            <p class="text-5xl font-bold flex items-center gap-2">
                <UIcon name="i-mingcute-news-fill" class="size-12" />最新消息
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-center p-6">
                <div
                    v-for="item in news"
                    :key="item.id"
                    class="bg-white/50 rounded-lg shadow-lg p-4 flex flex-col gap-2 items-center justify-center min-h-[300px]"
                >
                    <img :src="item.picture" alt="news-picture" class="w-full h-full object-cover" />
                    <p class="text-xl font-bold">{{ item.title }}</p>
                    <p class="text-md text-gray-500">{{ item.brief }}</p>
                </div>
            </div>
        </div>
    </div>
    <!-- 跑馬燈 -->

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
