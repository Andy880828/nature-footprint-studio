<script setup>
// 引入quill的css
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '請輸入內容...',
    },
});

const emit = defineEmits(['update:modelValue']);

const editor = ref(null);
const quillOptions = ref(null);

onMounted(async () => {
    const { QuillEditor } = await import('@vueup/vue-quill');
    editor.value = QuillEditor;

    quillOptions.value = {
        modules: {
            toolbar: {
                container: [
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ font: [] }],
                    [{ size: ['small', false, 'large', 'huge'] }],
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ indent: '-1' }, { indent: '+1' }],
                    ['blockquote', 'code-block'],
                    ['link', 'image'],
                    ['clean'],
                ],
                handlers: {
                    image: function () {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');
                        input.click();

                        input.onchange = async () => {
                            const file = input.files[0];
                            if (file) {
                                try {
                                    const formData = new FormData();
                                    formData.append('file', file);

                                    // 上傳圖片
                                    const { url } = await $fetch('/api/uploadPicture', {
                                        method: 'POST',
                                        body: formData,
                                    });

                                    // 獲取編輯器實例
                                    const quill = this.quill;
                                    // 獲取當前選擇的範圍
                                    const range = quill.getSelection(true);

                                    // 在編輯器中插入圖片
                                    quill.insertEmbed(range.index, 'image', url);
                                } catch (error) {
                                    console.error('圖片上傳失敗：', error);
                                    // 這裡可以添加錯誤提示
                                }
                            }
                        };
                    },
                },
            },
        },
        placeholder: props.placeholder,
        theme: 'snow',
    };
});
</script>

<template>
    <component
        :is="editor"
        v-if="editor && quillOptions"
        :options="quillOptions"
        :content="modelValue"
        @update:content="(newContent) => emit('update:modelValue', newContent)"
        contentType="html"
        class="w-full px-3 py-2 bg-gray-100 border border-gray-300 text-gray-500"
    />
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
/* ... 其他樣式 ... */
</style>
