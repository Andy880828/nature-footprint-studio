<script setup>
import { useWindowSize } from '@vueuse/core';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
definePageMeta({
    layout: 'management-system',
});
const allBlogsArr = ref([]);
const status = ref('pending');
const isInsertModalOpen = ref(false);
const insertingBlog = ref({
    title: '',
    category: '',
    content: '',
    link: '',
    picture: '',
});
const insertBlogExist = ref(true);
const isEditModalOpen = ref(false);
const editingBlogId = ref(null);
const editingBlog = computed(() => {
    console.log(allBlogsArr.value);
    return allBlogsArr.value.find((Blog) => Blog.id === editingBlogId.value);
});
const isDeleteModalOpen = ref(false);
const deletingBlogId = ref(null);

// 響應式移除創建時間跟圖片
const { width } = useWindowSize();
const columns = computed(() => {
    const baseColumns = [
        { key: 'id', label: 'ID' },
        { key: 'title', label: '標題' },
        { key: 'category', label: '類別' },
        { key: 'action', label: '動作' },
    ];
    // 只在非手機版（寬度大於 768px）時顯示圖片和建立時間
    if (width.value > 768) {
        baseColumns.splice(
            3,
            0,
            { key: 'picture', label: '圖片' },
            { key: 'link', label: '連結' },
            { key: 'created_at', label: '建立時間' }
        );
    }

    return baseColumns;
});

//// 獲取所有數據 ////
const fetchAllBlogs = async () => {
    try {
        status.value = 'pending';
        const { data } = await useFetch('/api/blog/fetch');
        status.value = 'success';
        return data.value;
    } catch (error) {
        status.value = 'error';
        console.error('獲取數據失敗:', error);
        return [];
    }
};
// 初始化時設定資料
allBlogsArr.value = await fetchAllBlogs();

//// 分頁 ////
const page = ref(1);
const pageCount = ref(10); // 每頁顯示數量
// 使用computed處理分頁
const blogs = computed(() => {
    const start = (page.value - 1) * pageCount.value;
    const end = start + pageCount.value;
    return allBlogsArr.value.slice(start, end);
});
// 計算總記錄數
const pageTotal = computed(() => allBlogsArr.value?.length || 0);

//// 新增 ////
const insertBlog = () => {
    isInsertModalOpen.value = true;
};
const handleInsert = async () => {
    try {
        const fileInput = document.querySelector('#insertBlog');
        const file = fileInput.files[0];
        if (!file) {
            insertBlogExist.value = false;
            return;
        }
        const compressedFile = await imageCompression(file);
        const formData = new FormData();
        formData.append('file', compressedFile);

        // 上傳圖片到 Supabase Storage
        let imageUrl;
        try {
            const { url } = await $fetch('/api/uploadPicture', {
                method: 'POST',
                body: formData,
            });
            imageUrl = url;
        } catch (error) {
            console.error('上傳失敗：', error);
            throw error; // 向上拋出錯誤，中止後續操作
        }

        // 將新聞資訊儲存到資料庫
        const { insertError } = await $fetch('/api/blog/insert', {
            method: 'POST',
            body: {
                title: insertingBlog.value.title,
                category: insertingBlog.value.category,
                content: insertingBlog.value.content,
                link: insertingBlog.value.link,
                picture: imageUrl,
            },
        });
        if (insertError) throw insertError;

        // 重新獲取圖片列表
        const { data: blogs } = await useFetch('/api/blog/fetch');
        allBlogsArr.value = blogs.value;

        // 關閉 Modal
        insertBlogExist.value = true;
        insertingBlog.value = {
            title: '',
            category: '',
            content: '',
            link: '',
            picture: '',
        };
        isInsertModalOpen.value = false;
    } catch (error) {
        console.error('上傳失敗:', error);
    }
};

//// 編輯 ////
const editBlog = (id) => {
    isEditModalOpen.value = true;
    editingBlogId.value = id;
};
const handleEdit = async () => {
    try {
        let imageUrl = editingBlog.value.picture; // 預設使用原本的圖片URL

        // 只有當有選擇新檔案時才進行圖片處理
        const fileInput = document.querySelector('#editBlog');
        if (fileInput.files && fileInput.files[0]) {
            const compressedFile = await imageCompression(fileInput.files[0]);
            const formData = new FormData();
            formData.append('file', compressedFile);

            // 上傳圖片到 Supabase Storage
            try {
                const { url } = await $fetch('/api/uploadPicture', {
                    method: 'POST',
                    body: formData,
                });
                imageUrl = url;
            } catch (error) {
                console.error('上傳失敗：', error);
                throw error;
            }
        }

        // 更新資料庫
        const { updateError } = await useFetch('/api/news/update', {
            method: 'PUT',
            body: {
                id: editingBlogId.value,
                picture: imageUrl,
                title: editingBlog.value.title,
                category: editingBlog.value.category,
                content: editingBlog.value.content,
                link: editingBlog.value.link,
            },
        });

        if (updateError) throw updateError;

        // 重新獲取圖片列表
        const { data: blogs } = await useFetch('/api/blog/fetch');
        allBlogsArr.value = blogs.value;
        isEditModalOpen.value = false;
    } catch (error) {
        console.error('編輯失敗:', error);
    }
};
//// 刪除 ////
const deleteBlog = (id) => {
    deletingBlogId.value = id;
    isDeleteModalOpen.value = true;
};
const handleDelete = async () => {
    try {
        const { deleteError } = await useFetch('/api/news/delete', {
            method: 'DELETE',
            body: {
                id: deletingBlogId.value,
            },
        });
        if (deleteError) throw deleteError;
        // 重新獲取圖片列表
        const { data: blogs } = await useFetch('/api/blog/fetch');
        allBlogsArr.value = blogs.value;
        isDeleteModalOpen.value = false;
    } catch (error) {
        console.error('刪除失敗:', error);
    }
};
</script>

<template>
    <!-- 新增Modal -->
    <UModal v-model="isInsertModalOpen">
        <div class="p-6 sm:p-8">
            <div>
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">新增文章</h3>
                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-1">標題</label>
                    <input
                        type="text"
                        required
                        v-model="insertingBlog.title"
                        class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                    />
                </div>

                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-1">類別</label>
                    <input
                        type="text"
                        required
                        v-model="insertingBlog.category"
                        class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                    />
                </div>
                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-1">內容</label>
                    <ClientOnly>
                        <QuillEditor
                            theme="snow"
                            v-model:content="insertingBlog.content"
                            contentType="html"
                            class="w-full px-3 py-2 bg-gray-100 border border-gray-300 text-gray-500"
                        />
                    </ClientOnly>
                </div>
                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-1">連結</label>
                    <input
                        type="text"
                        v-model="insertingBlog.link"
                        class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                    />
                </div>
                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-1">文章圖片(建議使用.webp)</label>
                    <p v-show="!insertBlogExist" class="text-sm text-red-500">請上傳圖片</p>
                    <input
                        type="file"
                        accept="image/*"
                        id="insertBlog"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div class="flex gap-3 items-center justify-center mt-6">
                    <button
                        @click.prevent="handleInsert"
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
    <UModal v-if="editingBlogId" v-model="isEditModalOpen">
        <div class="p-6 sm:p-8">
            <div>
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">編輯消息</h3>
                <form class="space-y-4">
                    <div>
                        <label class="block text-lg font-medium text-gray-700 mb-1">ID</label>
                        <input
                            type="text"
                            :value="editingBlogId"
                            disabled
                            class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                        />
                    </div>
                    <div>
                        <label class="block text-lg font-medium text-gray-700 mb-1">標題</label>
                        <input
                            type="text"
                            required
                            v-model="editingBlog.title"
                            class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                        />
                    </div>

                    <div>
                        <label class="block text-lg font-medium text-gray-700 mb-1">類別</label>
                        <input
                            type="text"
                            required
                            v-model="editingBlog.category"
                            class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                        />
                    </div>
                    <div>
                        <label class="block text-lg font-medium text-gray-700 mb-1">內容</label>
                        <ClientOnly>
                            <QuillEditor
                                theme="snow"
                                :content="editingBlog.content"
                                contentType="html"
                                @update:content="editingBlog.content = $event"
                                class="w-full px-3 py-2 bg-gray-100 border border-gray-300 text-gray-500"
                            />
                        </ClientOnly>
                    </div>
                    <div>
                        <label class="block text-lg font-medium text-gray-700 mb-1">連結</label>
                        <input
                            type="text"
                            v-model="editingBlog.link"
                            class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                        />
                    </div>
                    <div>
                        <label class="block text-lg font-medium text-gray-700 mb-1">
                            更改成以下圖片(建議使用.webp，可不更改)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="editBlog"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div class="flex gap-3 items-center justify-center mt-6">
                        <button
                            @click.prevent="handleEdit"
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
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">刪除文章</h3>
                <p class="text-lg text-gray-700">確定要刪除這則文章嗎？</p>
                <div class="flex gap-3 items-center justify-center mt-6">
                    <button
                        @click.prevent="handleDelete"
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
            <h1 class="md:text-4xl text-2xl font-bold">文章管理</h1>
            <UButton @click="insertBlog" color="gray" variant="ghost" icon="i-heroicons-plus-20-solid" size="md" />
        </div>
        <UTable
            :loading="status === 'pending'"
            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
            :progress="{ color: 'primary', animation: 'carousel' }"
            class="w-full mt-4"
            :rows="blogs"
            :columns="columns"
            :ui="{
                th: {
                    base: 'text-center',
                },
                td: {
                    base: 'text-center',
                },
            }"
        >
            <template #picture-data="{ row }">
                <img :src="row.picture" alt="pic" class="w-20 mx-auto" srcset="" />
            </template>
            <template #created_at-data="{ row }">
                <p>{{ new Date(row.created_at).toLocaleString() }}</p>
            </template>
            <template #action-data="{ row }">
                <UButton
                    @click="editBlog(row.id)"
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-pencil-square-20-solid"
                />
                <UButton @click="deleteBlog(row.id)" color="gray" variant="ghost" icon="i-heroicons-trash-20-solid" />
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

<style lang="css" scoped>
:deep(.ql-editor) {
    min-height: 200px;
}
:deep(.ql-toolbar.ql-snow) {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
:deep(.ql-container.ql-snow) {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
</style>
