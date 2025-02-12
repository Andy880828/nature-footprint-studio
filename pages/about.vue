<script setup>
import me from '@/assets/images/me.webp';
import bgLeaf from '@/assets/images/leaf.svg';
</script>

<template>
    <Hero title="創辦人介紹" icon="material-symbols-emoji-people" />

    <!-- 個人介紹區塊 -->
    <section class="relative py-12 overflow-hidden bg-gradient-to-b from-green-100 to-white">
        <img :src="bgLeaf" class="absolute size-96 z-[1] -right-20 -bottom-10 brightness-100" />
        <div class="container mx-auto px-4 relative z-[2]">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div class="relative">
                    <div
                        class="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-transparent rounded-3xl transform rotate-6"
                    ></div>
                    <img
                        :src="me"
                        alt="me"
                        class="relative w-full h-[600px] object-cover object-middle rounded-3xl shadow-xl"
                        draggable="false"
                    />
                </div>
                <div class="flex flex-col gap-8">
                    <div class="space-y-6">
                        <h1 class="text-4xl md:text-5xl lg:text-6xl text-center font-bold tracking-wide">
                            陳軒齊
                            <span class="block text-center text-xl md:text-2xl lg:text-3xl text-gray-600 mt-2"
                                >生態工作者</span
                            >
                        </h1>
                        <p class="text-xl text-center text-gray-600 leading-relaxed">
                            致力於生態保育與環境教育的推廣，期望透過知識分享與實地調查，為台灣的自然環境盡一份心力。
                        </p>
                    </div>
                    <div class="flex justify-center gap-4">
                        <NuxtLink
                            to="/contact"
                            class="relative group inline-block ring-2 ring-green-900 ring-offset-2 py-2 md:py-3 px-4 md:px-6 font-semibold text-green-900 hover:text-white rounded-xl shadow-sm bg-white transition duration-300 overflow-hidden"
                        >
                            <div
                                class="absolute top-0 right-full size-full bg-green-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"
                            ></div>
                            <div class="relative flex items-center gap-2">
                                <UIcon name="i-heroicons-envelope" class="size-4 md:size-5" />
                                <div class="flex flex-col items-start">
                                    <span class="text-sm md:text-base font-medium">聯絡資訊</span>
                                    <span class="text-[10px] md:text-xs opacity-80">Contact Information</span>
                                </div>
                                <UIcon
                                    name="i-heroicons-arrow-right"
                                    class="size-4 md:size-5 transform transition-transform group-hover:translate-x-1 ms-2"
                                />
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 專業領域 -->
    <section class="py-12 bg-white relative overflow-hidden">
        <img :src="bgLeaf" class="absolute size-96 z-[1] -left-20 rotate-180 -top-10 brightness-100" />
        <div class="container mx-auto px-4 relative z-[2]">
            <div class="max-w-2xl mx-auto mb-12 text-center">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold flex items-center justify-center gap-2 mb-6">
                    <UIcon name="i-material-symbols-psychology" class="size-8 md:size-10 lg:size-12" />
                    專業領域
                </h2>
                <p class="text-lg md:text-xl text-gray-600">多年來在不同生態領域的專業累積與實務經驗</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 content-center">
                <div class="relative group" data-aos="fade-down">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-50 rounded-full transform transition-transform group-hover:scale-105"
                    ></div>
                    <div
                        class="bg-white/80 aspect-square rounded-full shadow-lg hover:shadow-xl transition-all p-8 flex flex-col items-center justify-center text-center relative"
                    >
                        <div
                            class="absolute inset-4 border-2 border-green-100 rounded-full opacity-50 group-hover:scale-95 transition-transform"
                        ></div>
                        <UIcon
                            name="i-material-symbols-forest"
                            class="size-12 text-green-600 mb-4 transform group-hover:scale-110 transition-transform"
                        />
                        <h3 class="font-bold text-2xl mb-2">陸域生態</h3>
                        <p class="text-gray-600 text-sm">Terrestrial Ecology</p>
                    </div>
                </div>

                <div class="relative group" data-aos="fade-down">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-blue-100 to-sky-50 rounded-full transform transition-transform group-hover:scale-105"
                    ></div>
                    <div
                        class="bg-white/80 aspect-square rounded-full shadow-lg hover:shadow-xl transition-all p-8 flex flex-col items-center justify-center text-center relative"
                    >
                        <div
                            class="absolute inset-4 border-2 border-blue-100 rounded-full opacity-50 group-hover:scale-95 transition-transform"
                        ></div>
                        <UIcon
                            name="i-material-symbols-water"
                            class="size-12 text-blue-600 mb-4 transform group-hover:scale-110 transition-transform"
                        />
                        <h3 class="font-bold text-2xl mb-2">海洋生態</h3>
                        <p class="text-gray-600 text-sm">Marine Ecology</p>
                    </div>
                </div>

                <div class="relative group" data-aos="fade-down">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-amber-100 to-yellow-50 rounded-full transform transition-transform group-hover:scale-105"
                    ></div>
                    <div
                        class="bg-white/80 aspect-square rounded-full shadow-lg hover:shadow-xl transition-all p-8 flex flex-col items-center justify-center text-center relative"
                    >
                        <div
                            class="absolute inset-4 border-2 border-amber-100 rounded-full opacity-50 group-hover:scale-95 transition-transform"
                        ></div>
                        <UIcon
                            name="i-material-symbols-monitoring"
                            class="size-12 text-amber-600 mb-4 transform group-hover:scale-110 transition-transform"
                        />
                        <h3 class="font-bold text-2xl mb-2">物種監測與調查</h3>
                        <p class="text-gray-600 text-sm">Species Monitoring & Survey</p>
                    </div>
                </div>

                <div class="relative group" data-aos="fade-down">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-emerald-100 to-green-50 rounded-full transform transition-transform group-hover:scale-105"
                    ></div>
                    <div
                        class="bg-white/80 aspect-square rounded-full shadow-lg hover:shadow-xl transition-all p-8 flex flex-col items-center justify-center text-center relative"
                    >
                        <div
                            class="absolute inset-4 border-2 border-emerald-100 rounded-full opacity-50 group-hover:scale-95 transition-transform"
                        ></div>
                        <UIcon
                            name="i-material-symbols-eco"
                            class="size-12 text-emerald-600 mb-4 transform group-hover:scale-110 transition-transform"
                        />
                        <h3 class="font-bold text-2xl mb-2">環境保育與評估</h3>
                        <p class="text-gray-600 text-sm">Environmental Conservation & Assessment</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 學歷與工作經驗區塊 -->
    <section class="py-12 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
        <img :src="bgLeaf" class="absolute size-96 z-[1] -right-20 -bottom-10 brightness-100" />
        <div class="container mx-auto px-4 relative z-[2]">
            <div class="max-w-2xl mx-auto mb-16 text-center">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold flex items-center justify-center gap-2 mb-6">
                    <UIcon name="i-material-symbols-work-history" class="size-8 md:size-10 lg:size-12" />
                    學經歷背景
                </h2>
                <p class="text-lg md:text-xl text-gray-600">專業知識與實務經驗的累積</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 content-center">
                <!-- 學歷背景 -->
                <div data-aos="fade-down">
                    <h2 class="text-2xl font-bold mb-8 flex items-center gap-2">
                        <UIcon name="i-material-symbols-school" class="size-8 text-green-600" />
                        學歷背景
                    </h2>
                    <div class="relative border-l-2 border-green-600 pl-8 ml-4 space-y-10">
                        <div class="relative">
                            <div class="absolute -left-[2.55rem] size-4 rounded-full bg-green-600"></div>
                            <div>
                                <p class="font-bold text-lg">國立中山大學 海洋科學系 碩士</p>
                                <p class="text-gray-600">2023</p>
                            </div>
                        </div>
                        <div class="relative">
                            <div class="absolute -left-[2.55rem] size-4 rounded-full bg-green-600"></div>
                            <div>
                                <p class="font-bold text-lg">台南大學 生態暨環境資源學系 學士</p>
                                <p class="text-gray-600">2019</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 工作經驗 -->
                <div data-aos="fade-down">
                    <h2 class="text-2xl font-bold mb-8 flex items-center gap-2">
                        <UIcon name="i-material-symbols-work" class="size-8 text-green-600" />
                        工作與實習經驗
                    </h2>
                    <div class="relative border-l-2 border-green-600 pl-8 ml-4 space-y-10">
                        <div class="relative">
                            <div class="absolute -left-[2.55rem] size-4 rounded-full bg-green-600"></div>
                            <div>
                                <p class="font-bold text-lg">話蛇添足工作室</p>
                                <p class="text-gray-700">負責人</p>
                                <p class="text-gray-600">2025/02/20 – 現時</p>
                            </div>
                        </div>
                        <div class="relative">
                            <div class="absolute -left-[2.55rem] size-4 rounded-full bg-green-600"></div>
                            <div>
                                <p class="font-bold text-lg">台南永康國小</p>
                                <p class="text-gray-700">自然代課老師</p>
                                <p class="text-gray-600">2024/04/29 – 2024/06/27</p>
                            </div>
                        </div>
                        <div class="relative">
                            <div class="absolute -left-[2.55rem] size-4 rounded-full bg-green-600"></div>
                            <div>
                                <p class="font-bold text-lg">觀察家生態顧問有限公司</p>
                                <p class="text-gray-700">工讀生</p>
                                <p class="text-gray-600">2018/07 – 2018/08</p>
                                <p class="text-gray-700">實習生</p>
                                <p class="text-gray-600">2017/07 – 2017/08</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 演講與教育推廣 -->
    <section class="py-12 bg-white relative overflow-hidden">
        <img :src="bgLeaf" class="absolute size-96 z-[1] -left-20 rotate-180 -top-10 brightness-100" />
        <div class="container mx-auto px-4 relative z-[2]">
            <div class="max-w-2xl mx-auto mb-5 text-center">
                <h2 class="section-title">
                    <UIcon name="i-material-symbols-campaign" class="size-12" />
                    演講與教育推廣
                </h2>
                <p class="text-xl text-gray-600">分享生態知識，推廣環境教育</p>
            </div>
            <div class="space-y-4 max-w-4xl mx-auto" data-aos="fade-down">
                <UAccordion
                    :items="[
                        {
                            label: '2024 年度演講',
                            icon: 'i-material-symbols-calendar-today',
                            content: [
                                '野外調查經驗分享 – 中山大學海科系 (2hrs, 03/25)',
                                '蛇類介紹 – 嘉義北興國中 (2hrs, 04/17)',
                                '惡地不惡：以馬頭山生物多樣性為例 – 中山大學海科系 (1hr, 04/24)',
                                '蛇類介紹 – 新竹成德高中 (2hrs, 05/04)',
                                '甲殼類標本製作 – 新竹龍山國小 (2hrs, 05/08)',
                                '與在地社區發掘馬頭山生物多樣性 – 普門中學 (2hrs, 12/05)',
                                '舊鐵橋常見兩爬及蛇類介紹 – 高雄鳥會 (2hrs, 12/21)',
                            ],
                        },
                        {
                            label: '2023 年度演講',
                            icon: 'i-material-symbols-calendar-today',
                            content: [
                                '蛇類介紹 – 嘉義北興國中 (2hrs, 04/12)',
                                '蛇類介紹 – 台南大學生保社 (2hrs, 04/28)',
                                '蛇類介紹 – 新竹龍山國小 (2hrs, 12/07)',
                            ],
                        },
                        {
                            label: '2019 年度演講',
                            icon: 'i-material-symbols-calendar-today',
                            content: ['蛇我齊誰 – 成大自然生態觀察社 (1.5hrs, 10/17)'],
                        },
                    ]"
                    :ui="{
                        wrapper: 'flex flex-col w-full',
                        container: 'pt-4 w-full flex flex-col',
                        item: {
                            padding: 'p-4',
                            size: 'text-lg',
                        },
                    }"
                >
                    <template #default="{ item, index, open }">
                        <UButton
                            color="gray"
                            variant="ghost"
                            :ui="{ rounded: 'rounded-xl', padding: { sm: 'p-4' } }"
                            class="bg-white shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <template #leading>
                                <div class="size-10 rounded-full bg-green-700 flex items-center justify-center">
                                    <UIcon :name="item.icon" class="size-6 text-white" />
                                </div>
                            </template>

                            <span class="truncate text-xl font-bold">{{ item.label }}</span>

                            <template #trailing>
                                <UIcon
                                    name="i-heroicons-chevron-right-20-solid"
                                    class="size-5 ms-auto transform transition-transform duration-200"
                                    :class="{ 'rotate-90': open }"
                                />
                            </template>
                        </UButton>
                    </template>
                    <template #item="{ item }">
                        <ul class="space-y-4 p-6 bg-white/50 rounded-xl mt-4">
                            <li
                                v-for="(content, index) in item.content"
                                :key="index"
                                class="flex items-center gap-3 px-4 py-3 bg-white rounded-lg hover:bg-green-50 transition-colors duration-200 shadow-sm"
                            >
                                <UIcon name="i-material-symbols-event-available" class="size-5 text-green-600" />
                                <span class="text-gray-700">{{ content }}</span>
                            </li>
                        </ul>
                    </template>
                </UAccordion>
            </div>
        </div>
    </section>

    <!-- 生態議題參與 -->
    <section class="py-12 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
        <div class="container mx-auto px-4 relative z-[2]">
            <div class="max-w-2xl mx-auto mb-16 text-center">
                <h2 class="section-title">
                    <UIcon name="i-material-symbols-nature-people" class="size-12" />
                    生態議題參與
                </h2>
                <p class="text-xl text-gray-600">為環境發聲，守護自然生態</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div
                    v-for="(issue, index) in [
                        {
                            title: '台東縣海端鄉溪流整治現勘',
                            org: '農業部農村發展及水土保持署台東分局',
                            date: '2020/07/10',
                        },
                        {
                            title: '高雄田寮區牛寮溪不當工程現勘',
                            org: '林業保育署屏東分署',
                            date: '2021/05/03',
                        },
                        {
                            title: '「阿塱壹案延燒：牡丹鄉水泥祭三部曲」記者會',
                            date: '2023/06/16',
                        },
                    ]"
                    :key="index"
                    class="bg-white p-6 rounded-3xl shadow-xl card-hover"
                    data-aos="fade-down"
                >
                    <h3 class="font-bold text-xl mb-4">{{ issue.title }}</h3>
                    <p v-if="issue.org" class="text-gray-600 mb-2">{{ issue.org }}</p>
                    <p class="text-gray-500">{{ issue.date }}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 近年參與計畫與研究著作區塊 -->
    <section class="py-12 bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
        <img :src="bgLeaf" class="absolute size-96 z-[1] -right-20 -bottom-10 brightness-100" />
        <div class="container mx-auto px-4 relative z-[2]">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <!-- 近年參與計畫 -->
                <div>
                    <div class="mb-12 text-center lg:text-left">
                        <h2 class="text-4xl font-bold flex items-center gap-2 mb-4 justify-center lg:justify-start">
                            <UIcon name="i-material-symbols-science" class="size-10" />
                            近年參與計畫
                        </h2>
                        <p class="text-xl text-gray-600">專業調查研究與實地考察</p>
                    </div>
                    <div class="space-y-6">
                        <div
                            v-for="(project, index) in [
                                {
                                    year: '2023',
                                    org: '屏東縣政府',
                                    title: '旭海觀音鼻自然保留區水域生態資源調查',
                                    role: '計畫專員',
                                },
                                {
                                    year: '2023',
                                    org: '交通部公路總局第三區養護工程處',
                                    title: '台 26 線船帆石–砂島路段保護陸蟹之可行性研究',
                                    role: '調查人員',
                                },
                                {
                                    year: '2022',
                                    org: '內政部國家公園署海洋國家公園管理處',
                                    title: '澎湖南方四島魚卵及仔稚魚組成調查',
                                    role: '調查人員',
                                },
                            ]"
                            :key="index"
                            class="bg-white p-6 rounded-3xl shadow-xl card-hover"
                            data-aos="fade-down"
                        >
                            <div class="flex items-start gap-6">
                                <div class="bg-green-100 px-6 py-3 rounded-xl">
                                    <p class="font-bold text-xl text-green-800">{{ project.year }}</p>
                                </div>
                                <div class="flex-1">
                                    <p class="text-gray-600 mb-2">{{ project.org }}</p>
                                    <h3 class="font-bold text-xl mb-2">{{ project.title }}</h3>
                                    <p class="text-gray-500">{{ project.role }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 研究與著作 -->
                <div>
                    <div class="mb-12 text-center lg:text-left">
                        <h2 class="text-4xl font-bold flex items-center gap-2 mb-4 justify-center lg:justify-start">
                            <UIcon name="i-material-symbols-menu-book" class="size-10" />
                            研究與著作
                        </h2>
                        <p class="text-xl text-gray-600">學術研究成果與發表</p>
                    </div>
                    <div class="space-y-8">
                        <div class="bg-white p-8 rounded-3xl shadow-xl card-hover" data-aos="fade-down">
                            <h3 class="text-2xl font-bold mb-6 flex items-center gap-2">
                                <UIcon name="i-material-symbols-book" class="size-8 text-green-600" />
                                碩士論文
                            </h3>
                            <p class="text-gray-700 leading-relaxed">
                                Chen HC. (2023). Using next generation sequencing to analyze the diet composition of
                                terns from feces in the South Penghu Marine National Park.
                                國立中山大學海洋科學系碩士論文。
                            </p>
                        </div>
                        <div class="bg-white p-8 rounded-3xl shadow-xl card-hover" data-aos="fade-down">
                            <h3 class="text-2xl font-bold mb-6 flex items-center gap-2">
                                <UIcon name="i-material-symbols-description" class="size-8 text-green-600" />
                                研討會與學術發表
                            </h3>
                            <ul class="space-y-6">
                                <li class="p-4 rounded-xl hover:bg-green-50 transition-colors">
                                    <p class="text-gray-700 leading-relaxed">
                                        陳軒齊、廖德裕、謝寶森 (2020).
                                        利用次世代定序分析澎湖南方四島國家公園燕鷗排遺並鑑定其食性 – 2020
                                        動物行為暨生態研討會，澎湖科技大學，台灣。
                                    </p>
                                </li>
                                <li class="p-4 rounded-xl hover:bg-green-50 transition-colors">
                                    <p class="text-gray-700 leading-relaxed">
                                        陳軒齊、廖德裕、謝寶森 (2022). 利用次世代定序分析南沙太平島燕鷗排遺並鑑定其食性
                                        – 2022 動物行為暨生態研討會，台東大學，台灣。
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.section-title {
    @apply text-5xl font-bold flex items-center justify-center gap-2 mb-6;
}

.section-subtitle {
    @apply text-xl text-gray-600 text-center max-w-2xl mx-auto mb-16;
}

.card-hover {
    @apply transition-all duration-300 hover:shadow-2xl hover:-translate-y-2;
}
</style>
