<script setup>
import emailjs from '@emailjs/browser';
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['update:modelValue']);

const isModalOpen = computed({
    get() {
        return props.modelValue;
    },
    set(newValue) {
        emit('update:modelValue', newValue);
    },
});

const sendEmail = () => {
    const form = document.querySelector('form'); // 改為直接選擇 form 元素

    emailjs
        .sendForm(
            'service_csy44dj', // 您的 Service ID
            'nature_footprint', // 您的 Template ID
            form,
            'kdBCVBxZiUa25IXT5' // 您的 Public Key
        )
        .then(
            () => {
                console.log('發送成功!');
                isModalOpen.value = false;
                form.reset(); // 清空表單
            },
            (error) => {
                console.log('發送失敗...', error.text);
            }
        );
};
</script>

<template>
    <UModal v-model="isModalOpen" :ui="{ overlay: { background: 'bg-black/50' }, width: 'max-w-lg' }">
        <UCard>
            <!-- 標題和社群媒體連結 -->
            <div class="text-center space-y-4">
                <h3 class="text-xl font-semibold text-gray-800">使用社群媒體聯繫</h3>
                <div class="flex justify-center items-center gap-20 text-5xl text-gray-600">
                    <a href="https://facebook.com/your-page" target="_blank">
                        <UIcon name="i-mingcute-facebook-line" />
                    </a>
                    <a href="https://instagram.com/your-account" target="_blank">
                        <UIcon name="i-mingcute-instagram-line" />
                    </a>
                    <a href="https://threads.net/your-account" target="_blank">
                        <UIcon name="i-mingcute-threads-line" />
                    </a>
                </div>
                <h3 class="text-xl font-semibold text-gray-800">或者發送信件</h3>
            </div>

            <!-- 表單 -->
            <form @submit.prevent="sendEmail" class="mt-4 space-y-4">
                <UFormGroup label="姓名">
                    <UInput name="user_name" placeholder="請輸入姓名" required />
                </UFormGroup>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <UFormGroup label="Email">
                        <UInput name="user_email" type="email" placeholder="請輸入 Email" required />
                    </UFormGroup>

                    <UFormGroup label="行動電話">
                        <UInput name="user_phone" type="tel" placeholder="請輸入行動電話" />
                    </UFormGroup>
                </div>

                <UFormGroup label="訊息">
                    <UTextarea name="message" :rows="8" placeholder="請輸入訊息" required />
                </UFormGroup>

                <div class="flex justify-center">
                    <UButton type="submit" color="black" variant="solid" label="寄送郵件" />
                </div>
            </form>
        </UCard>
    </UModal>
</template>

<style lang="css" scoped></style>
