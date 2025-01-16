<script setup>
const userStore = useAuth();
const isMenuOpen = ref(false);
const isModalOpen = ref(false);

// 監聽側欄開關狀態
watch(isMenuOpen, (newVal) => {
    const aside = document.querySelector('aside');
    if (newVal) {
        aside.classList.remove('-translate-x-full');
    } else {
        aside.classList.add('-translate-x-full');
    }
});

onBeforeMount(() => {
    if (!userStore.value.loggedIn) {
        navigateTo('/login');
    }
});

// 添加登出函數
const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    userStore.value.email = '';
    userStore.value.loggedIn = false;
    navigateTo('/');
};
</script>

<template>
    <Navbar />
    <UModal v-model="isModalOpen">
        <div class="p-6 sm:p-8">
            <div class="text-center">
                <UIcon name="i-material-symbols-logout" class="mx-auto size-16 text-red-500 mb-4" />
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2">確認登出系統？</h3>
                <p class="text-gray-600 mb-1">登出將會清除登入資料與瀏覽器密碼記憶</p>
                <p class="text-gray-600 text-sm mb-6"><如為管理者本人裝置，建議不要登出></p>
                <div class="flex gap-3 justify-center">
                    <button
                        @click="isModalOpen = false"
                        class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                        取消
                    </button>
                    <button
                        @click="handleLogout"
                        class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                    >
                        確認登出
                    </button>
                </div>
            </div>
        </div>
    </UModal>
    <div class="flex relative">
        <!-- 左側白色側欄 -->
        <aside
            class="absolute left-0 top-[3.7rem] md:top-[4.5rem] w-64 h-screen bg-white shadow-lg transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out border-r border-gray-200 z-30"
        >
            <nav class="p-4">
                <ul class="space-y-2">
                    <li>
                        <NuxtLink
                            to="/managementSystem/pictures"
                            class="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-700 hover:text-gray-900 hover:shadow-sm active:bg-gray-200 font-medium text-md"
                            active-class="bg-gray-200 text-gray-900 shadow-sm"
                        >
                            <UIcon name="i-material-symbols-animated-images-outline" class="size-5 mr-2" />
                            首頁輪播圖片管理
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/managementSystem/news"
                            class="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-700 hover:text-gray-900 hover:shadow-sm active:bg-gray-200 font-medium text-md"
                            active-class="bg-gray-200 text-gray-900 shadow-sm"
                        >
                            <UIcon name="i-material-symbols-breaking-news-rounded" class="size-5 mr-2" />
                            最新消息管理
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/managementSystem/blogs"
                            class="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-700 hover:text-gray-900 hover:shadow-sm active:bg-gray-200 font-medium text-md"
                            active-class="bg-gray-200 text-gray-900 shadow-sm"
                        >
                            <UIcon name="i-mdi-blogger" class="size-5 mr-2" />
                            部落格管理
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/managementSystem/products"
                            class="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-700 hover:text-gray-900 hover:shadow-sm active:bg-gray-200 font-medium text-md"
                            active-class="bg-gray-200 text-gray-900 shadow-sm"
                        >
                            <UIcon name="i-icon-park-outline-ad-product" class="size-5 mr-2" />
                            商品管理
                        </NuxtLink>
                    </li>

                    <!-- 添加登出按鈕 -->
                    <li class="mt-8">
                        <button
                            @click="isModalOpen = true"
                            class="w-full flex items-center p-3 rounded-lg hover:bg-red-50 transition-all duration-200 text-red-600 hover:text-red-700 hover:shadow-sm active:bg-red-100 font-medium text-md"
                        >
                            <UIcon name="i-material-symbols-logout" class="size-5 mr-2" />
                            登出系統
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>

        <!-- 漢堡選單按鈕 (手機版) -->
        <button
            @click="isMenuOpen = !isMenuOpen"
            class="fixed bottom-6 right-6 md:hidden z-40 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-200"
        >
            側邊欄
        </button>

        <!-- 右側內容區域 -->
        <div
            class="w-full flex-1 mt-[3.7rem] md:mt-[4.5rem] min-h-screen p-4 md:p-6 bg-green-50 transition-all duration-300"
        >
            <div class="max-w-7xl mx-auto">
                <slot />
            </div>
        </div>
    </div>
    <Footer />
</template>

<style lang="css" scoped></style>
