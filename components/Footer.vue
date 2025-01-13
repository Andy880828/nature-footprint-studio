<script setup>
import bg from './assets/images/bg-footer.jpg';
</script>

<template>
    <footer
        :style="{ backgroundImage: `url(${bg})` }"
        class="relative w-full h-[200px] rounded-t-3xl bg-cover bg-center"
    >
        <div class="absolute inset-0 bg-black opacity-50 rounded-t-3xl"></div>
        <div class="relative z-10 p-8 w-full">
            <p class="text-white text-2xl">Hello</p>
        </div>
    </footer>
</template>

<style lang="css" scoped></style>
