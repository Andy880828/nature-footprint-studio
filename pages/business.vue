<script setup>
import business1 from '@/assets/images/business-1.webp';
import business2 from '@/assets/images/business-2.webp';
import business3 from '@/assets/images/business-3.webp';
import business4 from '@/assets/images/business-4.webp';
import snake1 from '@/assets/images/business/snake-1.webp';
import snake2 from '@/assets/images/business/snake-2.webp';
import snake3 from '@/assets/images/business/snake-3.webp';
import snake4 from '@/assets/images/business/snake-4.webp';
import snake5 from '@/assets/images/business/snake-5.webp';
import snake6 from '@/assets/images/business/snake-6.webp';
import night1 from '@/assets/images/business/night-1.webp';
import survey1 from '@/assets/images/business/survey-1.webp';
import survey2 from '@/assets/images/business/survey-2.webp';
import survey3 from '@/assets/images/business/survey-3.webp';
import survey4 from '@/assets/images/business/survey-4.webp';
import survey5 from '@/assets/images/business/survey-5.webp';
import survey6 from '@/assets/images/business/survey-6.webp';
import python1 from '@/assets/images/business/python-1.webp';
import python2 from '@/assets/images/business/python-2.webp';
import python3 from '@/assets/images/business/python-3.webp';
import python4 from '@/assets/images/business/python-4.webp';

const activeTab = ref('蛇類介紹課程');

const businesses = [
    {
        id: '蛇類介紹課程',
        image: business1,
        icon: 'i-material-symbols-school',
        title: '蛇類介紹課程',
        brief: '透過完整的介紹，希望幫助大家破除對蛇類的誤解，重新認識這群看似可怕但其實可愛又呆萌的物種，學會以正確方式與牠們共存。',
        description:
            '民眾普遍對於蛇類的知識甚少，在傳統的教育內也很少有機會能夠讓孩童有機會去接觸蛇類，也因為不熟悉及不認識的情況下，大家對於蛇類有著許多想像及誤解，我不會告訴大家聽完後就不該再感到害怕，而是希望過完整地介紹，讓大家能夠對這群看似可怕、危險的物種有新的認識，只要用對的方式和他們相處就能發現他們其實很可愛，甚至有點呆萌(?) ，在理解後能夠在未來的日子與這群生物共存。',
        services: [
            {
                title: '室內課程',
                items: ['蛇類基本生態介紹', '台灣常見蛇種辨識', '蛇類救援與處理', '與蛇共處的技巧', '零距離接觸寵物蛇'],
            },
            {
                title: '實地觀察',
                items: ['野外蛇類觀察小技巧', '安全距離維持', '棲地環境認識'],
            },
        ],
        gallery: [snake1, snake2, snake3, snake4, snake5, snake6],
    },
    {
        id: '夜間生態導覽',
        image: business2,
        icon: 'i-solar-magnifer-bug-linear',
        title: '夜間生態導覽',
        brief: '透過夜間探索活動，學習在適當的時間與地點發現野生動物，體驗課本與電視以外的真實自然世界，並掌握尋找與辨識動物的技巧，讓你不再錯過藏匿於細節中的驚喜。',
        description:
            '許多白天看似平平無奇的地方，隨著夜幕降臨，野生動物們才會逐漸出現，或許在課本及電視節目上都看過許多野生動物，卻從未親眼看見這些生物活生生地出現在你的面前，其實不是這些動物數量真的很少，可能只是沒有在對的時間、去對地方、然後遇見對的人(我，開玩笑ㄉ)，也或許我們都曾經離這些動物非常靠近，只是不知道如何尋找因此錯過，就跟錯過的那個她(他)，嗚嗚嗚，這樣的話是否也會感到可惜，魔鬼藏在細節裡，蛇會藏在樹叢裡，只要用對方式便能發現他們。所以來參加這些活動可以有做什麼?想像有天和朋友出門，在幾聲呱呱呱後你可以精準地說出是哪種青蛙，想想就很酷吧!(並沒有)。',
        services: [
            {
                title: '夜間觀察',
                items: ['夜間觀察小技巧', '野生動物行為觀察'],
            },
            {
                title: '物種辨識',
                items: ['兩棲類辨識', '爬蟲類辨識', '哺乳類辨識', '陸蟹辨識', '鳥類辨識'],
            },
            {
                title: '生態攝影',
                items: ['夜間攝影技巧', '生態紀錄方法', '不驚擾動物的拍攝守則'],
            },
        ],
        gallery: [night1],
    },
    {
        id: '田野生態調查',
        image: business3,
        icon: 'i-mingcute-mountain-2-fill',
        title: '田野生態調查',
        brief: '從大學自學兩棲爬蟲開始，到碩班專注於水域生態調查，透過多年的野外經驗累積，帶領大家逐步掌握陸域與水域生態調查的全方位技能。',
        description:
            '從大學開始接觸出野外，最早其實是想要學魚類，但當時系上沒有足夠的資源，因此決定先往陸域的方向學習，從大二開始自學兩棲爬蟲類，也是從那年開始幾乎泡在野外，接觸到的野生動物比人還多，也在大二那年到觀察家實習，跟著公司的前輩學習更多陸域調查，也開始學會架設自動相機、辨識影片中的物種，再到資料的處裡，也才有了後來能夠接下雞冠山、漯底山和後面馬頭山的哺乳類及兩爬調查的能力。碩班就決定朝著最初的方向踏入魚類實驗室，跟著實驗室的大家去澎湖南方四島採集鳥屎;到小琉球、阿朗壹的潮間帶做魚類調查，後來又到了澎湖南方四島採集仔稚魚，透過眾多調查累積自己水域生態調查的能力。',
        services: [
            {
                title: '陸域調查',
                items: ['穿越線調查法', '自動相機架設', '足跡與排遺辨識', '棲地環境評估'],
            },
            {
                title: '水域調查',
                items: ['溪流魚類調查', '潮間帶魚類調查', '亞潮間帶魚類調查(潛水)', '陸蟹調查'],
            },
            {
                title: '資料處理',
                items: ['調查數據統整', '生態資料分析', '調查報告撰寫'],
            },
        ],
        gallery: [survey1, survey2, survey3, survey4, survey5, survey6],
    },
    {
        id: '球蟒飼養販售',
        image: business4,
        icon: 'i-mdi-snake',
        title: '球蟒飼養販售',
        brief: '結合七年經驗，從球蟒的色彩變化到飼養心得，帶你認識這種安靜且吸引人的小夥伴，幫助新手輕鬆入門，也讓球蟒不僅是陪伴的寵物，也是和人分享交流的橋樑。',
        description:
            '我的第一條球蟒是在7年前飼養的，對我來說球蟒不只是寵物，而是當時心情不好時可以陪著我的家人，比起其他動物是沒有這麼高的互動性，但我需要的也只是一個安安靜靜陪著我的小夥伴，而且就算離開幾天不在，回來後他們還是活蹦亂跳的，不用像貓狗每天顧(好渣)。另外寵物蛇仍然算是小眾，想像今天若帶著一條寵物蛇出門，周圍的人可能就會被吸引過來，能藉此機會和陌生人快速的破冰，他們不僅能是寵物，也能是讓你交到新朋友的方式。最主要的其實還是想透過自己手上的球蟒們和七年來的經驗，除了和大家分享顏色及花紋變化多端的球蟒，也用第一手的經驗來分享球蟒在飼養上的疑難雜症。',
        services: [
            {
                title: '飼養指導',
                items: ['飼養環境設置', '餵食技巧教學', '溫濕度控制', '健康狀況監測'],
            },
            {
                title: '品種介紹',
                items: ['基因型態解說', '色彩變異種類', '繁殖配對建議', '品種選擇建議'],
            },
            {
                title: '售後服務',
                items: ['飼養問題解答', '緊急狀況處理', '環境改善建議'],
            },
        ],
        gallery: [python1, python2, python3, python4],
    },
];

const currentBusiness = computed(() => businesses.find((b) => b.id === activeTab.value));
</script>

<template>
    <Hero title="服務項目" icon="i-material-symbols-work" />

    <section class="py-10 bg-gradient-to-b from-green-100 to-white min-h-screen">
        <div class="container mx-auto px-4">
            <!-- 服務項目標籤列 -->
            <div class="flex flex-wrap justify-center gap-4 mb-10">
                <button
                    v-for="business in businesses"
                    :key="business.id"
                    @click="activeTab = business.id"
                    class="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300"
                    :class="
                        activeTab === business.id ? 'bg-green-600 text-white shadow-lg' : 'bg-white/50 hover:bg-white'
                    "
                >
                    <UIcon :name="business.icon" class="size-6" />
                    <span>{{ business.title }}</span>
                </button>
            </div>

            <!-- 內容區域 -->
            <div v-if="currentBusiness" class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <!-- 左側資訊 -->
                <div class="space-y-6">
                    <div class="aspect-video rounded-xl overflow-hidden">
                        <img
                            :src="currentBusiness.image"
                            :alt="currentBusiness.title"
                            class="w-full h-full object-cover"
                        />
                    </div>
                    <div class="bg-white/50 p-6 rounded-xl">
                        <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
                            <UIcon :name="currentBusiness.icon" class="size-8" />
                            {{ currentBusiness.title }}
                        </h2>
                        <div class="relative">
                            <div class="absolute inset-0 bg-green-100/50 rounded-xl transform rotate-1"></div>
                            <div class="absolute inset-0 bg-green-200/50 rounded-xl transform -rotate-1"></div>
                            <p
                                class="relative bg-white/50 p-6 rounded-xl text-gray-800 font-medium leading-loose text-justify"
                            >
                                {{ currentBusiness.brief }}
                            </p>
                        </div>
                        <p class="mt-4 text-gray-800 leading-loose text-justify">
                            {{ currentBusiness.description }}
                        </p>
                    </div>
                </div>

                <!-- 右側內容和相簿 -->
                <div class="space-y-6">
                    <!-- 服務內容 -->
                    <div class="bg-white/50 p-6 rounded-xl">
                        <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                            <UIcon name="i-material-symbols-description" class="size-6" />
                            服務內容
                        </h3>
                        <div class="space-y-6">
                            <div v-for="(service, index) in currentBusiness.services" :key="index" class="space-y-2">
                                <h4 class="text-lg font-semibold text-green-700 flex items-center gap-2">
                                    <UIcon name="i-material-symbols-check-circle" class="size-5" />
                                    {{ service.title }}
                                </h4>
                                <ul class="list-disc list-inside space-y-1 pl-4">
                                    <li
                                        v-for="(item, itemIndex) in service.items"
                                        :key="itemIndex"
                                        class="text-gray-700 text-lg"
                                    >
                                        {{ item }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- 相簿輪播 -->
                    <div class="bg-white/50 p-6 rounded-xl">
                        <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                            <UIcon name="i-material-symbols-photo-library" class="size-6" />
                            相關圖片
                        </h3>
                        <UCarousel
                            v-if="currentBusiness.gallery.length > 0"
                            v-slot="{ item }"
                            :items="currentBusiness.gallery"
                            :ui="{
                                wrapper: 'relative overflow-hidden',
                                item: 'h-full w-full',
                            }"
                            class="rounded-lg overflow-hidden"
                            arrows
                        >
                            <img :src="item" class="w-full h-full object-cover" draggable="false" />
                        </UCarousel>
                        <div v-else class="text-gray-500 text-center py-8">暫無相關圖片</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="css" scoped></style>
