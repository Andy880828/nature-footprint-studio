<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup>
const colorMode = useColorMode();
onMounted(() => {
    colorMode.preference = 'light';
});
</script>
