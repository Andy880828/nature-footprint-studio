<script setup>
import { useWindowSize } from '@vueuse/core';

definePageMeta({
    layout: 'management-system',
});

const allProductsArr = ref([]);
const status = ref('pending');
const isInsertModalOpen = ref(false);
const insertingProduct = ref({
    name: '',
    category: '',
    description: '',
    quantity: 0,
    price: 0,
    picture: '',
});
const insertProductExist = ref(true);
const isEditModalOpen = ref(false);
const editingProductId = ref(null);
const editingProduct = computed(() => {
    console.log(allProductsArr.value);
    return allProductsArr.value.find((Product) => Product.id === editingProductId.value);
});
const isDeleteModalOpen = ref(false);
const deletingProductId = ref(null);

// 響應式移除創建時間跟圖片
const { width } = useWindowSize();
const columns = computed(() => {
    const baseColumns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: '商品名稱' },
        { key: 'category', label: '類別' },
        { key: 'quantity', label: '數量' },
        { key: 'price', label: '單價' },
        { key: 'action', label: '動作' },
    ];
    // 只在非手機版（寬度大於 768px）時顯示圖片和建立時間
    if (width.value > 768) {
        baseColumns.splice(3, 0, { key: 'picture', label: '圖片' }, { key: 'created_at', label: '建立時間' });
    }

    return baseColumns;
});

const categoryTypes = ['蛇類', '爬蟲類', '首飾', '配件', '其他'];

//// 獲取所有數據 ////
const fetchAllProducts = async () => {
    try {
        status.value = 'pending';
        const { data } = await useFetch('/api/product/fetch');
        status.value = 'success';
        return data.value;
    } catch (error) {
        status.value = 'error';
        console.error('獲取數據失敗:', error);
        return [];
    }
};
// 初始化時設定資料
allProductsArr.value = await fetchAllProducts();

//// 分頁 ////
const page = ref(1);
const pageCount = ref(10); // 每頁顯示數量
// 使用computed處理分頁
const products = computed(() => {
    const start = (page.value - 1) * pageCount.value;
    const end = start + pageCount.value;
    return allProductsArr.value.slice(start, end);
});
// 計算總記錄數
const pageTotal = computed(() => allProductsArr.value?.length || 0);

//// 新增 ////
const insertProduct = () => {
    isInsertModalOpen.value = true;
};
const handleInsert = async () => {
    try {
        const fileInput = document.querySelector('#insertProduct');
        const file = fileInput.files[0];
        if (!file) {
            insertProductExist.value = false;
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
        const { insertError } = await $fetch('/api/product/insert', {
            method: 'POST',
            body: {
                title: insertingProduct.value.title,
                category: insertingProduct.value.category,
                description: insertingProduct.value.description,
                quantity: insertingProduct.value.quantity,
                price: insertingProduct.value.price,
                picture: imageUrl,
            },
        });
        if (insertError) throw insertError;

        // 重新獲取圖片列表
        const { data: products } = await useFetch('/api/product/fetch');
        allProductsArr.value = products.value;

        // 關閉 Modal
        insertProductExist.value = true;
        insertingProduct.value = {
            name: '',
            category: '',
            description: '',
            quantity: 0,
            price: 0,
            picture: '',
        };
        isInsertModalOpen.value = false;
    } catch (error) {
        console.error('上傳失敗:', error);
    }
};

//// 編輯 ////
const editProduct = (id) => {
    isEditModalOpen.value = true;
    editingProductId.value = id;
};
const handleEdit = async () => {
    try {
        let imageUrl = editingProduct.value.picture; // 預設使用原本的圖片URL

        // 只有當有選擇新檔案時才進行圖片處理
        const fileInput = document.querySelector('#editProduct');
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
        const { updateError } = await useFetch('/api/product/update', {
            method: 'PUT',
            body: {
                id: editingProductId.value,
                picture: imageUrl,
                name: editingProduct.value.name,
                category: editingProduct.value.category,
                description: editingProduct.value.description,
                quantity: editingProduct.value.quantity,
                price: editingProduct.value.price,
            },
        });

        if (updateError) throw updateError;

        // 重新獲取圖片列表
        const { data: products } = await useFetch('/api/product/fetch');
        allProductsArr.value = products.value;
        isEditModalOpen.value = false;
    } catch (error) {
        console.error('編輯失敗:', error);
    }
};
//// 刪除 ////
const deleteProduct = (id) => {
    deletingProductId.value = id;
    isDeleteModalOpen.value = true;
};
const handleDelete = async () => {
    try {
        const { deleteError } = await useFetch('/api/product/delete', {
            method: 'DELETE',
            body: {
                id: deletingProductId.value,
            },
        });
        if (deleteError) throw deleteError;
        // 重新獲取圖片列表
        const { data: products } = await useFetch('/api/product/fetch');
        allProductsArr.value = products.value;
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
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">新增商品</h3>
                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-1">商品名稱</label>
                    <input
                        type="text"
                        required
                        v-model="insertingProduct.name"
                        class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                    />
                </div>

                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-1">類別</label>
                    <UInputMenu
                        v-model="insertingProduct.category"
                        :options="categoryTypes"
                        required
                        class="w-full"
                        placeholder="輸入或選擇類別"
                        :ui="{
                            container: 'relative',
                            input: 'w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500',
                            option: {
                                base: 'px-3 py-2 focus:bg-gray-100 hover:bg-gray-100 cursor-pointer',
                                selected: 'bg-gray-100',
                            },
                        }"
                    />
                </div>
                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-1">商品描述</label>
                    <textarea
                        required
                        v-model="insertingProduct.description"
                        class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                    ></textarea>
                </div>
                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-1">商品數量</label>
                    <input
                        type="text"
                        required
                        v-model="insertingProduct.quantity"
                        class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                    />
                </div>
                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-1">商品單價</label>
                    <input
                        type="text"
                        required
                        v-model="insertingProduct.price"
                        class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                    />
                </div>
                <div>
                    <label class="block text-lg font-medium text-gray-700 mb-1">商品圖片(建議使用.webp)</label>
                    <p v-show="!insertProductExist" class="text-sm text-red-500">請上傳圖片</p>
                    <input
                        type="file"
                        accept="image/*"
                        id="insertProduct"
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
    <UModal v-if="editingProductId" v-model="isEditModalOpen">
        <div class="p-6 sm:p-8">
            <div>
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">編輯商品</h3>
                <form class="space-y-4">
                    <div>
                        <label class="block text-lg font-medium text-gray-700 mb-1">ID</label>
                        <input
                            type="text"
                            :value="editingProductId"
                            disabled
                            class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                        />
                    </div>
                    <div>
                        <label class="block text-lg font-medium text-gray-700 mb-1">商品名稱</label>
                        <input
                            type="text"
                            required
                            v-model="editingProduct.name"
                            class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                        />
                    </div>

                    <div>
                        <label class="block text-lg font-medium text-gray-700 mb-1">類別</label>
                        <UInputMenu
                            v-model="editingProduct.category"
                            :options="categoryTypes"
                            required
                            class="w-full"
                            placeholder="輸入或選擇類別"
                            :ui="{
                                container: 'relative',
                                input: 'w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500',
                                option: {
                                    base: 'px-3 py-2 focus:bg-gray-100 hover:bg-gray-100 cursor-pointer',
                                    selected: 'bg-gray-100',
                                },
                            }"
                        />
                    </div>
                    <div>
                        <label class="block text-lg font-medium text-gray-700 mb-1">商品描述</label>
                        <textarea
                            required
                            v-model="editingProduct.description"
                            class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                        ></textarea>
                    </div>
                    <div>
                        <label class="block text-lg font-medium text-gray-700 mb-1">商品數量</label>
                        <input
                            type="text"
                            required
                            v-model="editingProduct.quantity"
                            class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                        />
                    </div>
                    <div>
                        <label class="block text-lg font-medium text-gray-700 mb-1">商品單價</label>
                        <input
                            type="text"
                            required
                            v-model="editingProduct.price"
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
                            id="editProduct"
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
                <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">刪除商品</h3>
                <p class="text-lg text-gray-700">確定要刪除這個商品嗎？</p>
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
            <h1 class="md:text-4xl text-2xl font-bold">商品管理</h1>
            <UButton @click="insertProduct" color="gray" variant="ghost" icon="i-heroicons-plus-20-solid" size="md" />
        </div>
        <UTable
            :loading="status === 'pending'"
            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
            :progress="{ color: 'primary', animation: 'carousel' }"
            class="w-full mt-4 overflow-x-auto max-w-[100vw]"
            :rows="products"
            :columns="columns"
            :ui="{
                wrapper: 'relative w-full overflow-x-auto',
                base: 'min-w-full table-fixed',
                th: {
                    base: 'text-center whitespace-nowrap',
                    padding: 'px-2 py-2 md:px-3 md:py-3.5',
                },
                td: {
                    base: 'text-center whitespace-nowrap',
                    padding: 'px-2 py-2 md:px-3 md:py-3.5',
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
                    @click="editProduct(row.id)"
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-pencil-square-20-solid"
                />
                <UButton
                    @click="deleteProduct(row.id)"
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
