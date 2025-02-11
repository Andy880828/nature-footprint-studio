<script setup>
import bgNews from '@/assets/images/news.webp';
const { id } = useRoute().params;
const supabase = useSupabase();
const { data: news } = await supabase.from('news').select('*').eq('id', id).single();
</script>

<template>
    <section :style="{ backgroundImage: `url(${bgNews})` }" class="bg-cover bg-right-top">
        <div class="container w-full md:w-4/5 mx-auto px-4">
            <div class="bg-white/70 px-4 w-full min-h-screen py-8 mx-auto text-center flex flex-col items-center">
                <NuxtLink to="/news" class="self-start mb-4">
                    <button class="inline-flex items-center text-green-700 hover:text-green-900 font-semibold">
                        <Icon name="mdi:arrow-left" class="mr-2" />
                        最新消息列表
                    </button>
                </NuxtLink>
                <h1 class="md:text-4xl text-2xl font-bold text-gray-900 mb-2">{{ news?.title }}</h1>
                <span class="text-gray-500 text-sm">
                    {{ new Date(news?.created_at).toLocaleDateString('zh-TW') }}
                </span>
                <img :src="news?.picture" alt="news image" class="w-full md:w-1/2 h-auto mt-2 mb-8 rounded-lg" />
                <p class="text-lg text-gray-600 mb-8" v-html="news?.content"></p>
            </div>
        </div>
    </section>
</template>

<style lang="css" scoped></style>
