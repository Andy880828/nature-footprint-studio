<script setup>
const search = ref('');
const supabase = useSupabase();
const { data: products } = await supabase.from('product').select('*');
const categories = products.map((product) => product.category);
const sortBy = ref('');
const selectedCategory = ref('');
const maxPrice = ref(Math.max(...products.map((product) => product.price)));
const selectedMaxPrice = ref(maxPrice.value);
const showingProducts = computed(() => {
    let filteredProducts = [...products];

    if (selectedMaxPrice.value) {
        filteredProducts = filteredProducts.filter((product) => product.price <= selectedMaxPrice.value);
    }

    if (sortBy.value === 'latest') {
        return filteredProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    if (sortBy.value === 'oldest') {
        return filteredProducts.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
    if (sortBy.value === 'price-asc') {
        return filteredProducts.sort((a, b) => a.price - b.price);
    }
    if (sortBy.value === 'price-desc') {
        return filteredProducts.sort((a, b) => b.price - b.price);
    }
    if (selectedCategory.value) {
        return filteredProducts.filter((product) => product.category === selectedCategory.value);
    }
    if (search.value) {
        return filteredProducts.filter((product) => product.name.includes(search.value));
    }

    return filteredProducts;
});
const isFilterOpen = ref(false);
</script>

<template>
    <Hero title="購物專區" icon="i-icon-park-outline-ad-product" />

    <section class="py-10 bg-gradient-to-b from-green-100 to-white">
        <div class="container mx-auto px-4">
            <div class="flex gap-10 justify-center items-start">
                <div class="hidden md:block md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white/50 rounded-lg p-4">
                    <div class="flex flex-col items-center justify-center">
                        <UInput
                            v-model="search"
                            icon="i-heroicons-magnifying-glass"
                            placeholder="搜尋商品名稱..."
                            size="lg"
                            class="flex-1"
                        />
                    </div>
                    <p class="mt-5 text-center text-lg text-gray-500">商品分類</p>
                    <div class="mt-3 text-center flex flex-col gap-2">
                        <p class="text-lg cursor-pointer hover:text-green-500" @click="selectedCategory = ''">
                            全部 ({{ products.length }})
                        </p>
                        <p
                            v-for="category in categories"
                            :key="category"
                            class="text-lg cursor-pointer hover:text-green-500"
                            @click="selectedCategory = category"
                        >
                            {{ category }} ({{ products.filter((product) => product.category === category).length }})
                        </p>
                    </div>
                    <div class="mt-12">
                        <p class="text-lg text-center text-gray-500 mb-4">價格上限</p>
                        <div class="px-2">
                            <URange v-model="selectedMaxPrice" :min="0" :max="maxPrice" :step="100" />
                            <p class="mt-2 text-center text-gray-600">NT$ {{ selectedMaxPrice }}</p>
                        </div>
                    </div>
                </div>

                <div class="flex-1">
                    <div class="flex justify-between items-center">
                        <UButton
                            icon="iconamoon-options"
                            class="md:hidden fixed bottom-10 left-5 z-10"
                            size="lg"
                            @click="isFilterOpen = true"
                        />
                        <p class="text-xl md:text-2xl lg:text-3xl font-bold">商品列表</p>

                        <USelect
                            v-model="sortBy"
                            :options="[
                                { label: '商品由新到舊', value: 'latest' },
                                { label: '商品由舊到新', value: 'oldest' },
                                { label: '價格由低到高', value: 'price-asc' },
                                { label: '價格由高到低', value: 'price-desc' },
                            ]"
                            size="lg"
                            class="w-48"
                            placeholder="排序方式"
                        />
                    </div>
                    <div class="mt-10 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <NuxtLink
                            v-for="product in showingProducts"
                            :key="product.id"
                            :to="`/shop/${product.id}`"
                            class="group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div class="aspect-square overflow-hidden">
                                <img
                                    :src="product.picture"
                                    :alt="product.name"
                                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div class="p-4">
                                <p class="text-lg font-bold text-gray-800 mb-2">{{ product.name }}</p>
                                <p class="text-xl font-bold text-green-600">NT$ {{ product.price }}</p>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 手機版篩選 Slideover -->
    <USlideover
        v-model="isFilterOpen"
        side="left"
        :ui="{
            overlay: { background: 'bg-gray-900/80' },
            base: 'w-screen max-w-xs',
        }"
    >
        <div class="h-full bg-white p-4">
            <div class="flex justify-end mb-4">
                <UButton
                    icon="i-heroicons-x-mark"
                    color="gray"
                    variant="ghost"
                    size="lg"
                    @click="isFilterOpen = false"
                />
            </div>
            <div class="flex flex-col items-center justify-center">
                <UInput
                    v-model="search"
                    icon="i-heroicons-magnifying-glass"
                    placeholder="搜尋商品名稱..."
                    size="lg"
                    class="flex-1"
                />
            </div>
            <p class="mt-5 text-center text-lg text-gray-500">商品分類</p>
            <div class="mt-3 text-center flex flex-col gap-2">
                <p
                    class="text-lg cursor-pointer hover:text-green-500"
                    @click="
                        selectedCategory = '';
                        isFilterOpen = false;
                    "
                >
                    全部 ({{ products.length }})
                </p>
                <p
                    v-for="category in categories"
                    :key="category"
                    class="text-lg cursor-pointer hover:text-green-500"
                    @click="
                        selectedCategory = category;
                        isFilterOpen = false;
                    "
                >
                    {{ category }} ({{ products.filter((product) => product.category === category).length }})
                </p>
            </div>
            <div class="mt-12">
                <p class="text-lg text-center text-gray-500 mb-4">價格上限</p>
                <div class="px-2">
                    <URange v-model="selectedMaxPrice" :min="0" :max="maxPrice" :step="100" />
                    <p class="mt-2 text-center text-gray-600">NT$ {{ selectedMaxPrice }}</p>
                </div>
            </div>
        </div>
    </USlideover>
</template>

<style lang="css" scoped></style>
