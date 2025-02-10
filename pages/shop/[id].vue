<script setup>
const { id } = useRoute().params;
const supabase = useSupabase();
const { data: product } = await supabase.from('product').select('*').eq('id', id).single();
</script>

<template>
    <Hero title="購物專區" icon="i-icon-park-outline-ad-product" />

    <section class="py-12 lg:py-20 bg-gradient-to-b from-green-100 to-white">
        <div class="container mx-auto px-4 max-w-7xl">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <!-- 商品圖片區塊 -->
                <div class="overflow-hidden">
                    <div class="aspect-square bg-gray-50">
                        <img :src="product.picture" alt="商品圖片" class="w-full h-auto object-cover" />
                    </div>
                </div>

                <!-- 商品資訊區塊 -->
                <div class="space-y-8 p-4 lg:p-6">
                    <div class="space-y-4">
                        <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                            {{ product.name }}
                        </h1>
                        <p class="text-gray-500 text-xl">商品編號：{{ product.id }}</p>
                        <div class="text-3xl lg:text-4xl font-bold text-green-600">NT$ {{ product.price }}</div>
                    </div>

                    <div class="space-y-4 py-4 border-t border-b border-gray-200">
                        <p class="text-gray-700">商品描述:</p>
                        <p class="text-gray-600 leading-relaxed text-lg">
                            {{ product.description }}
                        </p>
                    </div>

                    <div class="flex items-center gap-4 py-2">
                        <span class="text-gray-700 font-medium">庫存數量</span>
                        <span class="px-3 py-2 bg-green-100 rounded-lg text-gray-800">{{ product.quantity }}</span>
                    </div>

                    <div class="bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                        <p class="flex items-center gap-2 text-gray-700">
                            <UIcon name="i-material-symbols-warning-rounded" class="text-yellow-600 text-5xl" />
                            <span class="text-sm">
                                因規模較小，目前商品僅提供線下購買，如果有想要的商品，請您截圖或記住商品編號，並聯繫我們作購買，謝謝您的配合。
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="css" scoped></style>
