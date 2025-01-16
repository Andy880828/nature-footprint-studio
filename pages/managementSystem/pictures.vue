<script setup>
definePageMeta({
    layout: 'management-system',
});

const { data: pictures } = useFetch('/api/pictures');

// 紀錄目前分頁
const page = ref(1);
// 設定每頁顯示的數量
const rows = 10;

const pageCount = computed(() => {
    return Math.ceil(pictures.value.length / rows);
});
</script>

<template>
    <div>
        <h1 class="text-4xl font-bold mt-4">輪播圖片(首頁)管理</h1>
        <UTable
            loading
            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
            :progress="{ color: 'primary', animation: 'carousel' }"
            class="w-full mt-4"
            :rows="rows"
            :columns="[
                { key: 'id', label: 'ID' },
                { key: 'name', label: '圖片' },
                { key: 'display', label: '顯示' },
                { key: 'action', label: '動作' },
            ]"
        />
        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
            <UPagination v-model="page" :page-count="pageCount" :total="pictures.length" />
        </div>
    </div>
</template>

<style lang="css" scoped></style>
s
