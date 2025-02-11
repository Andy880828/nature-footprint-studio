<script setup>
import bg from '@/assets/images/bg-footer.webp';
import facebook from '@/assets/images/icon-facebook.svg';
import instagram from '@/assets/images/icon-instagram.svg';
import threads from '@/assets/images/icon-threads.svg';
</script>

<template>
    <footer
        :style="{ backgroundImage: `url(${bg})` }"
        class="relative w-full h-[150px] rounded-t-3xl bg-cover bg-center overflow-hidden"
    >
        <NuxtLink to="/login">
            <div
                class="absolute bottom-5 right-5 size-10 rounded-full bg-black text-gray-900 hover:scale-105 hover:text-white transition-all duration-200 cursor-pointer z-50 flex items-center justify-center"
            >
                <UIcon name="i-material-symbols-settings-alert" class="size-6" />
            </div>
        </NuxtLink>
        <div class="absolute inset-0 bg-black opacity-50 rounded-t-3xl"></div>
        <div class="grid grid-cols-1 gap-2 md:grid-cols-2 place-items-center relative z-10 p-8 h-full">
            <NuxtLink to="/">
                <div class="flex gap-3 items-center justify-center">
                    <div class="items-center justify-center bg-white rounded-full p-1 hidden md:flex">
                        <img src="assets/images/icon.svg" class="size-16" alt="" />
                    </div>
                    <div class="flex flex-col">
                        <span class="text-white text-xl md:text-3xl font-bold">話蛇添足工作室</span>
                        <span class="text-white text-xs md:text-sm">Nature's Footprint Studio</span>
                    </div>
                </div>
            </NuxtLink>
            <div class="flex flex-col justify-center items-center gap-5">
                <div class="flex flex-row justify-center items-center gap-10 md:gap-20">
                    <img
                        :src="facebook"
                        class="size-12 md:size-16 brightness-0 invert hover:opacity-80 transition-opacity cursor-pointer"
                        alt="Facebook"
                    />
                    <img
                        :src="instagram"
                        class="size-12 md:size-16 brightness-0 invert hover:opacity-80 transition-opacity cursor-pointer"
                        alt="Instagram"
                    />
                    <img
                        :src="threads"
                        class="size-[2.35rem] md:size-[3.1rem] brightness-100 invert hover:opacity-80 transition-opacity cursor-pointer"
                        alt="Threads"
                    />
                </div>
                <p class="text-white text-center text-md">Copyright © 2025 話蛇添足工作室</p>
            </div>
        </div>
    </footer>
</template>

<style lang="css" scoped></style>
