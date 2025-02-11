<script setup>
import icon from '@/assets/images/icon.svg';
</script>

<template>
    <div class="min-h-screen bg-gradient-to-b from-green-100 to-white flex items-center justify-center p-4">
        <div class="flex flex-col items-center gap-8 text-center">
            <!-- Logo 區域 -->
            <div class="flex flex-col md:flex-row items-center gap-4">
                <div class="flex items-center justify-center bg-white rounded-full p-2 shadow-lg">
                    <img :src="icon" class="size-20 md:size-32" alt="logo" />
                </div>
                <div class="flex flex-col items-center md:items-start">
                    <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">404</h1>
                    <p class="text-xl md:text-2xl lg:text-3xl text-gray-600">頁面不存在</p>
                </div>
            </div>

            <!-- 錯誤訊息 -->
            <div class="max-w-lg">
                <p class="text-lg md:text-xl text-gray-600 mb-8">
                    很抱歉，您所尋找的頁面不存在。請確認網址是否正確，或返回首頁。
                </p>
                <NuxtLink
                    to="/"
                    class="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition-colors duration-200"
                >
                    <UIcon name="i-material-symbols-home" class="size-6" />
                    <span>返回首頁</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped></style>
