<script setup>
import bg1 from '~/assets/images/bg-section-1.jpg';
definePageMeta({
    layout: 'landing-page',
});
</script>

<template>
    <div :style="{ backgroundImage: `url(${bg1})` }" class="relative w-full min-h-screen bg-cover bg-center z-0">
        <div class="absolute inset-0 bg-white opacity-80 z-[1]"></div>
        <div class="relative container mx-auto py-20 z-10">
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
    </div>
</template>

<style lang="css" scoped></style>
