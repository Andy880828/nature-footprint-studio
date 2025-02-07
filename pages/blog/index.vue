<script setup>
const search = ref('');
const category = ref('');
const supabase = useSupabase();
const { data: blogs } = await useAsyncData('blogs', async () => {
    const { data } = await supabase.from('blog').select('*');
    return data;
});

const showedBlogs = computed(() => {
    if (!blogs.value) return [];
    let showedBlogs = blogs.value;
    if (category.value) {
        showedBlogs = showedBlogs.filter((blog) => blog.category === category.value);
    }
    if (search.value) {
        showedBlogs = showedBlogs.filter((blog) => {
            return blog.title.includes(search.value) || blog.content.includes(search.value);
        });
    }
    // 根據 id 降序排序（大的在前面）
    showedBlogs = showedBlogs.sort((a, b) => b.id - a.id);
    return showedBlogs;
});
</script>

<template>
    <section class="py-20 bg-gradient-to-b from-green-200 to-white">
        <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto mb-12 text-center">
                <h1 class="text-5xl font-bold flex items-center justify-center gap-2">
                    <UIcon name="i-mdi-blogger" class="size-12" />部落格
                </h1>
            </div>
            <!-- 搜尋/篩選 -->
            <div class="max-w-5xl mx-auto space-y-6">
                <div class="flex justify-between items-center gap-4 bg-white/70 p-2 rounded-xl shadow-sm">
                    <div class="relative flex-1">
                        <UIcon
                            name="i-heroicons-magnifying-glass"
                            class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5"
                        />
                        <input
                            type="text"
                            v-model="search"
                            placeholder="搜尋文章標題、內容..."
                            class="w-full pl-11 pr-4 py-2 bg-gray-50/50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                        />
                    </div>
                    <div class="relative w-48">
                        <select
                            v-model="category"
                            class="w-full appearance-none py-2 px-4 bg-gray-50/50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                        >
                            <option value="">所有分類</option>
                            <option value="兩棲爬蟲類">兩棲爬蟲類</option>
                            <option value="鳥類">鳥類</option>
                            <option value="魚類">魚類</option>
                            <option value="等足類">等足類</option>
                            <option value="其它">其它</option>
                        </select>
                        <UIcon
                            name="i-heroicons-chevron-down"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 size-5 pointer-events-none"
                        />
                    </div>
                </div>
            </div>
            <!-- 部落格列表 -->
            <div class="mt-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    v-for="blog in showedBlogs"
                    :key="blog.id"
                    class="flex flex-col shadow-sm rounded-xl hover:bg-gradient-to-t hover:from-green-100 hover:to-white/80 hover:shadow-lg transition-all duration-300"
                >
                    <div class="relative m-3">
                        <img
                            :src="blog.picture || '/images/default-blog.jpg'"
                            :alt="blog.title"
                            class="w-full h-48 object-cover"
                        />
                    </div>
                    <div class="p-3 flex flex-col flex-1 justify-center">
                        <h2 class="text-xl text-center font-semibold mb-3">{{ blog.title }}</h2>
                        <div class="flex items-center justify-center gap-3 mb-2">
                            <span class="text-gray-500 text-sm">
                                {{ new Date(blog.created_at).toLocaleDateString() }}
                            </span>
                            <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                {{ blog.category }}
                            </span>
                        </div>
                        <div class="mt-2 flex justify-center">
                            <NuxtLink
                                class="relative group inline-block py-2 px-4 font-semibold text-green-900 hover:text-white rounded-xl shadow-sm bg-white transition duration-300 overflow-hidden"
                                :to="`/blog/${blog.id}`"
                            >
                                <div
                                    class="absolute top-0 right-full size-full bg-green-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"
                                ></div>
                                <span class="relative">閱讀文章</span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="css" scoped></style>
