<script setup>
import bgNews from '@/assets/images/news.webp';
// 利用我們寫好的Composable抓取API資料
const supabase = useSupabase();
// fetch消息
const { data: news } = await supabase.from('news').select('*');
const orderedNews = computed(() => {
    if (!news) return []; // 添加空數組作為預設值
    return [...news].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA; // 降序排列，最新的在前面
    });
});

// 分頁設定
const page = ref(1);
const pageCount = ref(5); // 每頁顯示數量
// 使用computed處理分頁
const paginatedNews = computed(() => {
    const start = (page.value - 1) * pageCount.value;
    const end = start + pageCount.value;
    return orderedNews.value.slice(start, end);
});
// 計算總記錄數
const pageTotal = computed(() => orderedNews.value?.length || 0);
</script>

<template>
    <Hero title="最新消息" icon="i-material-symbols-breaking-news-rounded" />
    <div :style="{ backgroundImage: `url(${bgNews})` }" class="min-h-screen py-20 bg-cover bg-right-top">
        <!-- 標題區塊 -->
        <div class="container mx-auto px-4">
            <!-- 消息列表 -->
            <div class="max-w-5xl mx-auto space-y-6">
                <div
                    v-for="(news, idx) in paginatedNews"
                    :key="idx"
                    class="bg-white/80 shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                    data-aos="fade-down"
                >
                    <div class="flex flex-col md:flex-row md:gap-6 gap-2">
                        <div class="md:w-1/4">
                            <img
                                :src="news.picture"
                                class="w-full h-auto md:h-48 object-cover rounded-lg hover:opacity-90 transition-opacity duration-300"
                                alt="news-picture"
                            />
                        </div>
                        <div class="md:w-2/3 flex flex-col justify-between">
                            <div>
                                <span class="text-gray-500 text-sm">
                                    {{ new Date(news.created_at).toLocaleDateString('zh-TW') }}
                                </span>
                                <h2
                                    class="text-2xl font-bold text-gray-900 mt-2 hover:text-green-700 transition-colors duration-300"
                                >
                                    {{ news.title }}
                                </h2>
                                <p class="text-gray-600 mt-4">{{ news.brief }}</p>
                            </div>
                            <div class="mt-6">
                                <NuxtLink :to="`/news/${news.id}`">
                                    <button
                                        class="inline-flex items-center text-green-700 hover:text-green-900 font-semibold"
                                    >
                                        閱讀更多
                                        <UIcon name="i-material-symbols-arrow-outward" class="size-5 ml-1" />
                                    </button>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 分頁 -->
            <div class="flex justify-center mt-12">
                <UPagination
                    v-model="page"
                    :page-count="pageCount"
                    :total="pageTotal"
                    :ui="{
                        wrapper: 'flex items-center gap-1',
                        rounded: '!rounded-full min-w-[32px] justify-center',
                        default: {
                            activeButton: {
                                variant: 'outline',
                            },
                        },
                    }"
                />
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped></style>
