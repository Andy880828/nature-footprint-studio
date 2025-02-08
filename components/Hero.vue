<script setup>
import bgHero from '~/assets/images/bg-hero.webp';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div
        :style="{ backgroundImage: `url(${bgHero})` }"
        class="relative mt-12 z-0 w-full h-[20rem] text-center text-2xl font-bold flex items-center justify-center gap-4 bg-cover bg-center bg-no-repeat bg-black/50 bg-blend-overlay text-white"
    >
        <UIcon v-if="icon" :name="icon" class="size-12 md:size-16 z-[1]" />
        <span class="z-[1] text-4xl md:text-5xl lg:text-6xl tracking-wider">{{ title }}</span>
    </div>
</template>

<style lang="css" scoped></style>
