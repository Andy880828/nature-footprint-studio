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
    <Hero title="部落格" icon="i-mdi-blogger" />
    <section class="py-10 bg-gradient-to-b from-green-200 to-white">
        <div class="container mx-auto px-4">
            <div class="max-w-5xl mx-auto space-y-6">
                <!-- 搜尋/篩選區域 -->
                <div class="flex justify-between items-center gap-4">
                    <UInput
                        v-model="search"
                        icon="i-heroicons-magnifying-glass"
                        placeholder="搜尋文章標題、內容..."
                        size="lg"
                        class="flex-1"
                    />
                    <USelect
                        v-model="category"
                        :options="[
                            { label: '所有分類', value: '' },
                            { label: '兩棲爬蟲類', value: '兩棲爬蟲類' },
                            { label: '鳥類', value: '鳥類' },
                            { label: '魚類', value: '魚類' },
                            { label: '等足類', value: '等足類' },
                            { label: '其它', value: '其它' },
                        ]"
                        size="lg"
                        class="w-48"
                    />
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
                            <UBadge color="green" size="sm">{{ blog.category }}</UBadge>
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
