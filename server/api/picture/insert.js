export default defineEventHandler(async (event) => {
    try {
        // 從 request body 獲取數據
        const body = await readBody(event);
        const { picture, display } = body;

        const supabase = useSupabase();
        const { data, error } = await supabase.from('picture').insert({
            picture: picture,
            display: display,
        });

        if (error) throw error;

        return { success: true, data };
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message,
        });
    }
});
