export default defineEventHandler(async (event) => {
    const supabase = useSupabase();

    try {
        // 從請求中獲取檔案
        const formData = await readMultipartFormData(event);
        if (!formData || !formData[0]) {
            throw createError({
                statusCode: 400,
                message: '未找到上傳的檔案',
            });
        }

        const file = formData[0];

        // 生成唯一檔名
        const timestamp = new Date().getTime();
        const fileName = `${timestamp}-${file.filename}`;

        // 直接上傳到 Supabase Storage
        const { data, error } = await supabase.storage.from('pictures').upload(fileName, file.data, {
            contentType: file.type,
        });

        if (error) {
            throw createError({
                statusCode: 400,
                message: error.message,
            });
        }

        // 獲取公開 URL
        const { data: urlData } = supabase.storage.from('pictures').getPublicUrl(data.path);

        return {
            success: true,
            url: urlData.publicUrl,
        };
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: '檔案上傳失敗：' + error.message,
        });
    }
});
