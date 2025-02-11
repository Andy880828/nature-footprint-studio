<script setup>
import bgImage from '@/assets/images/contact.webp';
const contactInfo = [
    {
        icon: 'i-material-symbols-mail',
        title: 'Email',
        content: 'reptile0720@gmail.com',
    },
    {
        icon: 'i-material-symbols-headphones',
        title: '聯絡電話',
        content: '0900000000',
    },
];
const socialMedia = [
    {
        icon: 'i-mingcute-facebook-line',
        link: 'https://facebook.com/your-page',
        label: 'Facebook',
    },
    {
        icon: 'i-mingcute-instagram-line',
        link: 'https://instagram.com/your-account',
        label: 'Instagram',
    },
    {
        icon: 'i-mingcute-threads-line',
        link: 'https://threads.net/your-account',
        label: 'Threads',
    },
];
</script>

<template>
    <section
        class="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-20"
        :style="{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bgImage})`,
        }"
    >
        <div
            class="relative bg-white/75 backdrop-blur-md rounded-2xl p-8 md:p-12 w-full max-w-4xl shadow-xl border border-white/20"
        >
            <!-- 裝飾元素 -->
            <div
                class="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-800 text-white px-8 py-3 rounded-full shadow-lg"
            >
                <h1 class="text-2xl md:text-3xl font-bold">聯絡我們</h1>
            </div>

            <div class="mt-8 grid md:grid-cols-2 gap-8">
                <div
                    v-for="(info, index) in contactInfo"
                    :key="index"
                    class="flex flex-col items-center text-center space-y-4 p-6 rounded-xl hover:bg-white/80 transition-all duration-300"
                >
                    <div
                        class="bg-green-800 rounded-full size-20 flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300"
                    >
                        <UIcon :name="info.icon" class="size-12 text-white" />
                    </div>
                    <h2 class="text-3xl font-bold text-green-800">{{ info.title }}</h2>
                    <p
                        v-if="info.content"
                        class="text-gray-700 font-medium hover:text-green-800 transition-colors duration-300"
                    >
                        {{ info.content }}
                    </p>
                </div>
            </div>

            <!-- 社群媒體區塊 -->
            <div class="mt-16 flex flex-col items-center space-y-8">
                <div class="relative">
                    <h2 class="text-3xl font-bold text-green-800">社群媒體</h2>
                </div>
                <div class="flex justify-center gap-12">
                    <a
                        v-for="social in socialMedia"
                        :key="social.label"
                        :href="social.link"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group flex flex-col items-center space-y-3"
                        :aria-label="social.label"
                    >
                        <div
                            class="size-16 md:size-20 rounded-full bg-white shadow-md group-hover:bg-green-800 group-hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                        >
                            <UIcon
                                :name="social.icon"
                                class="size-10 md:size-12 text-green-800 group-hover:text-white transition-colors duration-300"
                            />
                        </div>
                        <span
                            class="text-base font-medium text-gray-700 group-hover:text-green-800 transition-colors duration-300"
                        >
                            {{ social.label }}
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
