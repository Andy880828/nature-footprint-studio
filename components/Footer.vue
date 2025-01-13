<script setup>
import bg from './assets/images/bg-footer.jpg';
import facebook from './assets/images/icon-facebook.svg';
import instagram from './assets/images/icon-instagram.svg';
import x from './assets/images/icon-x.svg';
</script>

<template>
    <footer
        :style="{ backgroundImage: `url(${bg})` }"
        class="relative w-full h-[150px] rounded-t-3xl bg-cover bg-center overflow-hidden"
    >
        <div class="absolute inset-0 bg-black opacity-50 rounded-t-3xl"></div>
        <div class="grid grid-cols-1 gap-2 md:grid-cols-2 place-items-center relative z-10 p-8 h-full">
            <NuxtLink to="/">
                <div class="flex gap-3 items-center justify-center">
                    <div class="items-center justify-center bg-white rounded-full p-1 hidden md:flex">
                        <img src="assets/images/icon.svg" class="size-16" alt="" />
                    </div>
                    <div class="flex flex-col">
                        <span class="text-white text-xl md:text-3xl font-bold">話蛇天足工作室</span>
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
                        :src="x"
                        class="size-12 md:size-16 brightness-0 invert hover:opacity-80 transition-opacity cursor-pointer"
                        alt="X"
                    />
                </div>
                <p class="text-white text-center text-md">Copyright © 2025 話蛇天足工作室</p>
            </div>
        </div>
    </footer>
</template>

<style lang="css" scoped></style>
