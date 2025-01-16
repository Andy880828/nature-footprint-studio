<script setup>
definePageMeta({
    layout: 'management-system',
});

const allPicturesArr = ref([]);
const isInsertModalOpen = ref(false);
const insertingPicture = ref({
    picture: null,
    display: false,
});
const isEditModalOpen = ref(false);
const editingPictureId = ref(null);
const editingPicture = computed(() => {
    return allPicturesArr.value.find((picture) => picture.id === editingPictureId.value);
});
const isDeleteModalOpen = ref(false);
const deletingPictureId = ref(null);

//// 獲取所有數據 ////
const fetchAllPictures = async () => {
    // useFetch返回的是一個Promise物件，解構得到裡面的data
    const { data } = await useFetch('/api/picture/fetch');
    // 用data.value才能抓到資料，因為裡面的data是響應式資料，需要用.value提取
    return data.value;
};
// 初始化時設定資料
allPicturesArr.value = await fetchAllPictures();

//// 分頁 ////
const page = ref(1);
const limit = ref(10); // 每頁顯示數量
// 使用computed處理分頁
const pictures = computed(() => {
    const start = (page.value - 1) * limit.value;
    const end = start + limit.value;
    return allPicturesArr.value.slice(start, end);
});
// 計算總頁數
const pageTotal = computed(() => allPicturesArr.value?.length || 0);
const pageCount = computed(() => Math.ceil(pageTotal.value / limit.value));

//// 新增 ////
const insertPicture = () => {
    isInsertModalOpen.value = true;
};
const handleInsert = async () => {
    try {
        const fileInput = document.querySelector('#insertPicture');
        const file = fileInput.files[0];
        if (!file) {
            throw new Error('請選擇圖片');
        }

        const compressedFile = await imageCompression(file);

        const formData = new FormData();
        formData.append('file', compressedFile);

        // 上傳圖片到 Supabase Storage
        let imageUrl;
        try {
            const response = await fetch('/api/uploadPicture', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            imageUrl = data.url; // 假設 API 回傳 { url: "圖片網址" }
        } catch (error) {
            console.error('上傳失敗：', error);
            throw error; // 向上拋出錯誤，中止後續操作
        }

        // 將圖片資訊儲存到資料庫
        const { error: insertError } = await $fetch('/api/picture/insert', {
            method: 'POST',
            body: {
                picture: imageUrl,
                display: insertingPicture.value.display,
            },
        });
        if (insertError) throw insertError;

        // 重新獲取圖片列表
        const { data } = await useFetch('/api/picture/fetch');
        allPicturesArr.value = data.value;

        // 關閉 Modal
        isInsertModalOpen.value = false;
    } catch (error) {
        console.error('上傳失敗:', error);
        // 這裡可以加入錯誤提示給使用者
    }
};

//// 編輯 ////
const editPicture = (id) => {
    isEditModalOpen.value = true;
    editingPictureId.value = id;
};
const handleEdit = async () => {
    //修改edit邏輯
};
//// 刪除 ////
const deletePicture = (id) => {
    deletingPictureId.value = id;
    isDeleteModalOpen.value = true;
};
const handleDelete = async () => {
    //修改delete邏輯
};
</script>

<template>
    <!-- 新增Modal -->
    <UModal v-model="isInsertModalOpen">
        <div class="p-6 sm:p-8">
            <div>
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">新增輪播圖片</h3>
                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-1">加入以下圖片(建議使用.webp)</label>
                    <input
                        type="file"
                        accept="image/*"
                        id="insertPicture"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div class="flex items-center mt-3">
                    <label for="display" class="block text-lg text-gray-700">顯示於首頁輪播</label>
                    <input
                        type="checkbox"
                        id="display"
                        v-model="insertingPicture.display"
                        class="ms-3 size-4 rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                    />
                </div>
                <div class="flex gap-3 items-center justify-center mt-6">
                    <button
                        @click="handleInsert"
                        type="submit"
                        class="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
                    >
                        上傳
                    </button>
                    <button
                        @click="isInsertModalOpen = false"
                        type="button"
                        class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                        取消
                    </button>
                </div>
            </div>
        </div>
    </UModal>
    <!-- 編輯Modal -->
    <UModal v-if="editingPictureId" v-model="isEditModalOpen">
        <div class="p-6 sm:p-8">
            <div>
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">編輯輪播圖片</h3>
                <form class="space-y-4">
                    <div>
                        <label class="block text-lg font-medium text-gray-700 mb-1">ID</label>
                        <input
                            type="text"
                            :value="editingPictureId"
                            disabled
                            class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                        />
                    </div>

                    <div>
                        <label class="block text-lg font-medium text-gray-700 mb-1"
                            >更改成以下圖片(建議使用.webp)</label
                        >
                        <input
                            type="file"
                            accept="image/*"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div class="flex items-center">
                        <label for="display" class="block text-lg text-gray-700">顯示於首頁輪播</label>
                        <input
                            type="checkbox"
                            id="display"
                            :checked="editingPicture.display"
                            class="ms-3 size-4 rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                        />
                    </div>

                    <div class="flex gap-3 items-center justify-center mt-6">
                        <button
                            @click="handleEdit"
                            type="submit"
                            class="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
                        >
                            儲存
                        </button>
                        <button
                            @click="isEditModalOpen = false"
                            type="button"
                            class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                            取消
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </UModal>
    <!-- 刪除Modal -->
    <UModal v-model="isDeleteModalOpen">
        <div class="p-6 sm:p-8">
            <div>
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">刪除輪播圖片</h3>
                <p class="text-lg text-gray-700">確定要刪除這張圖片嗎？</p>
                <div class="flex gap-3 items-center justify-center mt-6">
                    <button
                        @click="handleDelete"
                        type="submit"
                        class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                    >
                        刪除
                    </button>
                    <button
                        @click="isDeleteModalOpen = false"
                        type="button"
                        class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                        取消
                    </button>
                </div>
            </div>
        </div>
    </UModal>
    <!-- 主頁面 -->
    <div>
        <div class="flex gap-3 items-center">
            <h1 class="text-4xl font-bold">輪播圖片(首頁)管理</h1>
            <UButton @click="insertPicture" color="gray" variant="ghost" icon="i-heroicons-plus-20-solid" size="xl" />
        </div>
        <UTable
            :loading="status === 'pending'"
            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
            :progress="{ color: 'primary', animation: 'carousel' }"
            class="w-full mt-4"
            :rows="pictures"
            :columns="[
                { key: 'id', label: 'ID' },
                { key: 'picture', label: '圖片' },
                { key: 'display', label: '顯示' },
                { key: 'action', label: '動作' },
            ]"
        >
            <template #picture-data="{ row }">
                <img :src="row.picture" alt="pic" class="w-20" srcset="" />
            </template>
            <template #action-data="{ row }">
                <UButton
                    @click="editPicture(row.id)"
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-pencil-square-20-solid"
                />
                <UButton
                    @click="deletePicture(row.id)"
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-trash-20-solid"
                />
            </template>
        </UTable>
        <div class="flex justify-end px-3 py-3.5 border-t border-gray-200">
            <UPagination
                v-model="page"
                :page-count="pageCount"
                :total="pageTotal"
                :ui="{
                    wrapper: 'flex items-center gap-1',
                    rounded: '!rounded-full min-w-[32px] justify-center',
                    default: {
                        activeButton: {
                            variant: 'outline',
                        },
                    },
                }"
            />
        </div>
    </div>
</template>

<style lang="css" scoped></style>
s
