export const useSupabasePicture = () => {
    // 上傳檔案到 Supabase 的輔助函式
    const uploadFileToSupabase = async (fileName, file) => {
        try {
            const { data, error } = await supabase.storage.from('pictures').upload(fileName, file);
            if (error) return { success: false, message: error.message };
            return { success: true, data };
        } catch (error) {
            return { success: false, message: '檔案上傳失敗' };
        }
    };

    // 從 Supabase 獲取公開 URL 的輔助函式
    const getPublicUrlFromSupabase = (fileName) => {
        const { data } = supabase.storage.from('pictures').getPublicUrl(fileName);
        return data.publicUrl;
    };

    return { uploadFileToSupabase, getPublicUrlFromSupabase };
};
