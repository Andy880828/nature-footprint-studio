<script setup>
const props = defineProps({
    showNavbar: {
        type: Boolean,
        default: true,
    },
});
const isOpen = ref(false);
const toggleMobileMenu = () => {
    isOpen.value = !isOpen.value;
};
</script>

<template>
    <header
        class="fixed top-0 left-0 right-0 w-full from-green-900 to-green-700 bg-gradient-to-r md:px-[10%] z-50 transition-all duration-500 ease-in-out"
        :class="[
            'transform',
            showNavbar ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-full opacity-0 scale-95',
        ]"
    >
        <nav class="flex items-center p-2 gap-10">
            <!-- logo -->
            <NuxtLink to="/">
                <div class="flex gap-3">
                    <div class="flex items-center justify-center bg-white rounded-full p-1">
                        <img src="assets/images/icon.svg" class="size-10" alt="" />
                    </div>
                    <div class="flex flex-col items-center">
                        <span class="text-white text-xl font-bold">話蛇天足工作室</span>
                        <span class="text-white text-xs">Nature's Footprint Studio</span>
                    </div>
                </div>
            </NuxtLink>
            <!-- 響應式Hamburger -->
            <div class="ml-auto block cursor-pointer self-center pr-4 md:hidden">
                <!-- 用一個button當wrapper，給予id並使用group關鍵字 -->
                <button @click="toggleMobileMenu" id="mobile-menu-button" class="group peer" :class="{ open: isOpen }">
                    <!-- 使用div配合bgColor來畫線 -->
                    <div
                        class="relative top-0 h-1 w-8 rounded-full bg-zinc-200 transition-all group-open:top-2 group-open:rotate-45"
                    ></div>
                    <!-- 利用opacity使其隱藏 -->
                    <div
                        class="mt-1 h-1 w-8 rounded-full bg-zinc-200 opacity-100 transition-all group-open:opacity-0"
                    ></div>
                    <div
                        class="relative top-0 mt-1 h-1 w-8 rounded-full bg-zinc-200 transition-all group-open:-top-2 group-open:-rotate-45"
                    ></div>
                </button>
                <!-- 響應式Menu -->
                <div
                    class="absolute top-[63px] left-0 hidden w-full from-green-900 to-green-700 bg-gradient-to-r text-center text-white font-bold peer-open:block"
                >
                    <NuxtLink to="/business"
                        ><div class="p-4 py-auto transition-colors hover:bg-white/10">
                            <span>服務項目</span><span class="text-xs ms-2">Service</span>
                        </div>
                    </NuxtLink>
                    <NuxtLink to="/about"
                        ><div class="p-4 py-auto transition-colors hover:bg-white/10">
                            <span>創辦人介紹</span><span class="text-xs ms-2">About</span>
                        </div>
                    </NuxtLink>
                    <NuxtLink to="/contact"
                        ><div class="p-4 py-auto transition-colors hover:bg-white/10">
                            <span>聯絡資訊</span><span class="text-xs ms-2">Contact</span>
                        </div>
                    </NuxtLink>
                    <NuxtLink to="/shop"
                        ><div class="p-4 py-auto transition-colors hover:bg-white/10">
                            <span>購物專區</span><span class="text-xs ms-2">Shop</span>
                        </div>
                    </NuxtLink>
                    <NuxtLink to="/blog"
                        ><div class="p-4 py-auto transition-colors hover:bg-white/10">
                            <span>部落格</span><span class="text-xs ms-2">Blog</span>
                        </div>
                    </NuxtLink>
                    <div class="p-2">
                        <div
                            class="bg-white text-green-800 p-2 flex justify-center items-center rounded-xl transition-colors hover:bg-green-800 hover:text-white"
                        >
                            <span>工作詢問</span><span class="text-xs ms-2">Work Inquiry</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 頁面 -->
            <div class="flex-1 justify-center hidden md:flex">
                <ul class="flex items-center md:gap-5 xl:gap-10 2xl:gap-20 text-white text-md lg:text-lg">
                    <li>
                        <NuxtLink
                            to="/business"
                            class="flex flex-col items-center hover:scale-105 hover:text-green-500 transition-all duration-200"
                        >
                            <p>服務項目</p>
                            <p class="text-xs">Service</p>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/about"
                            class="flex flex-col items-center hover:scale-105 hover:text-green-500 transition-all duration-200"
                        >
                            <p>創辦人介紹</p>
                            <p class="text-xs">About</p>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/contact"
                            class="flex flex-col items-center hover:scale-105 hover:text-green-500 transition-all duration-200"
                        >
                            <p>聯絡資訊</p>
                            <p class="text-xs">Contact</p>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/shop"
                            class="flex flex-col items-center hover:scale-105 hover:text-green-500 transition-all duration-200"
                        >
                            <p>購物專區</p>
                            <p class="text-xs">Shop</p>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/blog"
                            class="flex flex-col items-center hover:scale-105 hover:text-green-500 transition-all duration-200"
                        >
                            <p>部落格</p>
                            <p class="text-xs">Blog</p>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <!-- 工作詢問 -->
            <div class="items-center gap-4 hidden md:flex">
                <div
                    class="bg-white text-green-800 px-4 py-2 rounded-xl cursor-pointer text-lg hover:scale-105 hover:text-white hover:bg-green-800 transition-all duration-200"
                >
                    <p>工作詢問</p>
                    <p class="text-xs">Work Inquiry</p>
                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="css" scoped></style>
