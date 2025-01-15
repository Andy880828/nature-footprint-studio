<script setup>
const userStore = useAuth();
definePageMeta({
    layout: 'management-system',
});
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-6 p-4 md:p-8">
        <div class="flex flex-col md:flex-row items-center gap-4">
            <div class="flex items-center justify-center bg-white rounded-full p-2">
                <img src="/assets/images/icon.svg" class="size-12 md:size-20" alt="logo" />
            </div>
            <div class="flex flex-col items-center md:items-center md:mr-8">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">歡迎使用管理系統</h1>
                <p class="text-xl md:text-2xl text-gray-600">Welcome to Management System</p>
            </div>
        </div>
        <div class="max-w-2xl text-center">
            <p class="text-lg md:text-xl text-gray-600">
                這裡是話蛇天足工作室的後台管理系統，您可以在這裡管理網站的內容，包括首頁輪播圖片、最新消息、部落格文章以及商品資訊。
            </p>
        </div>
        <div class="flex flex-col md:flex-row gap-4 mt-4 text-center">
            <div class="flex items-center gap-2 text-gray-600">
                <UIcon name="i-material-symbols-person" class="size-6" />
                <span>目前登入帳號：{{ userStore.email }}</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600">
                <UIcon name="i-material-symbols-calendar-today" class="size-6" />
                <span>登入時間：{{ new Date().toLocaleString() }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped></style>
