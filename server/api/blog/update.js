export default defineEventHandler(async (event) => {
    const supabase = useSupabase();
    const { id, title, category, content, link, picture } = await readBody(event);

    // 根據是否有 picture 參數來執行不同的更新操作
    const { data: updateData, error: updateError } = await supabase
        .from('blog')
        .update(picture ? { title, category, content, link, picture } : { title, category, content, link })
        .eq('id', id);

    if (updateError) {
        throw createError({
            statusCode: 500,
            statusMessage: updateError.message,
        });
    }

    return { updateData, updateError };
});
