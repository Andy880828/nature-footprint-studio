<script setup>
const { id } = useRoute().params;
const supabase = useSupabase();
const { data: blog } = await supabase.from('blog').select('*').eq('id', id).single();
</script>

<template>
    <section class="py-12 bg-gradient-to-b from-green-100 to-white">
        <div class="container w-full md:w-4/5 mx-auto px-4 flex flex-col items-center gap-4">
            <NuxtLink to="/blog" class="self-start mb-4">
                <button class="inline-flex items-center text-green-700 hover:text-green-900 font-semibold">
                    <Icon name="mdi:arrow-left" class="mr-2" />
                    部落格列表
                </button>
            </NuxtLink>
            <p class="text-center text-sm text-gray-500">
                原文連結: <a :href="blog.link" target="_blank">{{ blog.link }}</a>
            </p>
            <h1 class="text-3xl md:text-4xl lg:text-5xl text-center font-bold">
                {{ blog.title }}
            </h1>
            <p class="text-center text-gray-500">{{ new Date(blog.created_at).toLocaleDateString() }}</p>
            <img :src="blog.picture" :alt="blog.title" class="w-full md:w-1/2 h-auto object-cover rounded-t-xl" />
            <p class="text-lg pt-5" v-html="blog.content"></p>
        </div>
    </section>
</template>

<style lang="css" scoped></style>
