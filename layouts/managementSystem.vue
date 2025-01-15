<script setup>
const userStore = useAuth();
// 在頁面載入時檢查是否已登入，未登入則跳轉至登入頁面
onBeforeMount(() => {
    if (!userStore.value.loggedIn) {
        navigateTo('/login');
    }
});
</script>

<template>
    <Navbar />
    <div class="md:mt-[4.5rem] min-h-screen">
        <slot />
    </div>
    <Footer />
</template>

<style lang="css" scoped></style>
