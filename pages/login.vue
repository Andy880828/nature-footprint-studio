<script setup>
import bcrypt from 'bcryptjs';

const remember = ref(false);
const email = ref('');
const password = ref('');
const errorMessage = ref('');
// 使用全域狀態
const userStore = useAuth();

// 在頁面載入時檢查是否已登入，已登入則跳轉至管理系統
onBeforeMount(() => {
    if (userStore.value.loggedIn) {
        navigateTo('/managementSystem');
    }
});

onMounted(() => {
    // 查看是否有用localStorage存帳密
    const localStorageEmail = localStorage.getItem('email');
    const localStoragePassword = localStorage.getItem('password');
    // 如果localStorage有存帳密，則將其設為email和password
    if (localStorageEmail) {
        email.value = localStorageEmail;
        remember.value = true;
    }
    if (localStoragePassword) {
        password.value = localStoragePassword;
    }
});

// 登入
const login = async () => {
    // 等待驗證結果
    const isValid = await validate();
    if (!isValid) {
        errorMessage.value = '帳號或密碼錯誤';
        return;
    }
    // 只有在驗證成功時才執行以下程式碼
    if (remember.value) {
        localStorage.setItem('email', email.value);
        localStorage.setItem('password', password.value);
    }
    userStore.value.loggedIn = true;
    userStore.value.email = email.value;
    navigateTo('/managementSystem');
};

// 驗證帳密
const validate = async () => {
    try {
        // 利用我們寫好的 utils 抓取 API 資料
        const supabase = useSupabase();
        // 取得密碼
        const { data: users, error } = await supabase
            .from('users')
            .select('email, hashed_password, is_editor')
            .eq('is_editor', true)
            .eq('email', email.value);
        // 錯誤處理
        if (error) {
            console.error('查詢錯誤:', error.message);
            return false;
        }
        if (!users || users.length === 0) {
            console.warn('未找到該使用者');
            return false;
        }
        // 提取第一個用戶的數據
        const user = users[0];
        // 比較密碼
        const res = await bcrypt.compare(password.value, user.hashed_password);

        return res; // 如果密碼正確返回 true，否則返回 false
    } catch (err) {
        console.error('驗證過程中發生錯誤:', err);
        return false;
    }
};
</script>

<template>
    <section class="bg-green-50">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <p class="text-center mb-6 text-3xl font-semibold text-gray-900">話蛇天足工作室 - 管理系統</p>
            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-md font-bold leading-tight tracking-tight text-gray-900 md:text-xl">
                        請登入您的帳號
                    </h1>
                    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
                    <form class="space-y-4 md:space-y-6">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none block w-full p-2.5"
                                placeholder="name@mail.com"
                                required
                                v-model="email"
                            />
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">密碼</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none block w-full p-2.5"
                                required
                                v-model="password"
                            />
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input
                                        aria-describedby="remember"
                                        type="checkbox"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                                        v-model="remember"
                                    />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500">記住我</label>
                                </div>
                            </div>
                        </div>
                        <button
                            @click.prevent="login"
                            type="submit"
                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primary-300 rounded-lg text-md px-5 py-2.5 text-center"
                        >
                            登入
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="css" scoped></style>
