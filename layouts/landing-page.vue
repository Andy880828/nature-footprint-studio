<script setup>
import bg1 from './assets/images/bg-landing-1.jpg';
import bg2 from './assets/images/bg-landing-2.jpg';
import bg3 from './assets/images/bg-landing-3.jpg';

// 向下滾動出現navbar
const showNavbar = ref(false);

// 響應式Menu
const isOpen = ref(false);
const toggleMobileMenu = () => {
    isOpen.value = !isOpen.value;
};

// 背景圖片
const bgArr = [bg1, bg2, bg3];
const bgCounter = ref(0);
const changeBg = () => {
    if (bgCounter.value === 2) {
        bgCounter.value = 0;
    } else {
        bgCounter.value = bgCounter.value + 1;
    }
};

onMounted(() => {
    // 預加載圖片
    bgArr.forEach((src) => {
        const img = new Image();
        img.src = src;
    });

    // 設置背景圖自動輪播
    const intervalId = setInterval(() => {
        changeBg();
    }, 5000);

    onUnmounted(() => {
        clearInterval(intervalId);
    });

    // 向下滾動出現navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 180) {
            showNavbar.value = true;
        } else {
            showNavbar.value = false;
        }
    });
});
</script>

<template>
    <div class="relative min-h-screen">
        <!-- 背景圖片 -->
        <div
            :style="{ backgroundImage: `url(${bgArr[bgCounter]})` }"
            class="absolute inset-0 bg-cover bg-top bg-fixed z-0 transition-all duration-1000"
        ></div>
        <!-- 暗色遮罩層 -->
        <div class="absolute inset-0 bg-black/70 z-[1]"></div>
        <!-- 內容層 -->
        <div class="relative min-h-screen z-[2]">
            <!-- 導航欄 -->
            <div class="flex items-center justify-center absolute top-5 md:top-10 w-full px-auto">
                <ul class="hidden md:flex items-center gap-10 lg:gap-40 text-white text-xl lg:text-2xl">
                    <li>
                        <NuxtLink
                            to="/business"
                            class="flex flex-col items-center hover:scale-105 hover:text-green-500 transition-all duration-200"
                        >
                            <p>服務項目</p>
                            <p class="text-sm">Service</p>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/"
                            class="flex flex-col items-center hover:scale-105 hover:text-green-500 transition-all duration-200"
                        >
                            <p>創辦人介紹</p>
                            <p class="text-sm">About</p>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/contact"
                            class="flex flex-col items-center hover:scale-105 hover:text-green-500 transition-all duration-200"
                        >
                            <p>聯絡資訊</p>
                            <p class="text-sm">Contact</p>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/shop"
                            class="flex flex-col items-center hover:scale-105 hover:text-green-500 transition-all duration-200"
                        >
                            <p>購物專區</p>
                            <p class="text-sm">Shop</p>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/blog"
                            class="flex flex-col items-center hover:scale-105 hover:text-green-500 transition-all duration-200"
                        >
                            <p>部落格</p>
                            <p class="text-sm">Blog</p>
                        </NuxtLink>
                    </li>
                </ul>
                <!-- 響應式Hamburger -->
                <div class="ml-auto block cursor-pointer self-center pr-4 md:hidden">
                    <!-- 用一個button當wrapper，給予id並使用group關鍵字 -->
                    <button
                        @click="toggleMobileMenu"
                        id="mobile-menu-button"
                        class="group peer"
                        :class="{ open: isOpen }"
                    >
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
                        class="absolute top-[37px] left-1/2 -translate-x-1/2 rounded-xl hidden w-[90%] text-center bg-black/40 text-white font-bold peer-open:block"
                    >
                        <NuxtLink to="/business"
                            ><div class="p-4 py-auto transition-colors rounded-t-xl hover:bg-white/10">
                                <span>服務項目</span><span class="text-xs ms-2">Service</span>
                            </div>
                        </NuxtLink>
                        <NuxtLink to="/"
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
                            ><div class="p-4 py-auto transition-colors rounded-b-xl hover:bg-white/10">
                                <span>部落格</span><span class="text-xs ms-2">Blog</span>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <!-- 標題 -->
            <div class="flex flex-col items-center justify-center h-screen gap-5 px-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                    <div class="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        <div class="flex items-center justify-center bg-zinc-300 rounded-full p-1 size-40 md:size-52">
                            <img src="assets/images/icon.svg" alt="" />
                        </div>
                        <div class="flex flex-col gap-3 md:gap-5 items-center md:items-start justify-center">
                            <h1 class="text-white text-5xl md:text-7xl lg:text-8xl font-bold">話蛇天足</h1>
                            <h1 class="text-white text-4xl md:text-6xl lg:text-7xl font-bold">工作室</h1>
                            <h1 class="text-white text-2xl md:text-3xl lg:text-4xl font-bold">
                                Nature's Footprint Studio
                            </h1>
                        </div>
                    </div>
                    <div class="flex flex-col items-center justify-center gap-5 md:gap-10 mt-5 md:mt-0">
                        <h1 class="text-white text-xl md:text-3xl lg:text-4xl text-center md:text-left">
                            「 探索自然奧秘，追尋天地足跡。 」
                        </h1>
                        <!-- 工作詢問 -->
                        <div class="flex items-center justify-center text-center mt-5 md:mt-0">
                            <div
                                class="bg-white text-green-800 px-6 md:px-10 py-2 rounded-xl cursor-pointer text-xl md:text-2xl hover:scale-105 hover:text-white hover:bg-green-800 transition-all duration-200"
                            >
                                <p>工作詢問</p>
                                <p class="text-sm">Work Inquiry</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 滾動提示 -->
            <div class="container_mouse absolute bottom-5 left-1/2 -translate-x-1/2">
                <span class="mouse-btn">
                    <span class="mouse-scroll"></span>
                </span>
                <span class="text-white">請向下滾動</span>
            </div>
        </div>
    </div>
    <navbar :showNavbar="showNavbar" />
    <div class="container mx-auto md:mx-[10%]">
        <slot />
    </div>
</template>

<style lang="css" scoped>
.mouse-btn {
    margin: 10px auto;
    width: 40px;
    height: 80px;
    border: 3px solid rgba(255, 255, 255, 0.918);
    border-radius: 20px;
    display: flex;
}

.mouse-scroll {
    display: block;
    width: 20px;
    height: 20px;
    background: linear-gradient(170deg, rgba(122, 122, 124, 0.918), rgb(123, 124, 124));
    border-radius: 50%;
    margin: auto;
    animation: scrolling13 1s linear infinite;
}

@keyframes scrolling13 {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }

    100% {
        opacity: 1;
        transform: translateY(20px);
    }
}
</style>
