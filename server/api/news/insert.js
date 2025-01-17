export default defineEventHandler(async (event) => {
    const supabase = useSupabase();
    // 從 request body 獲取數據
    const body = await readBody(event);
    const { title, brief, content, picture } = body;
    const { data: insertData, error: insertError } = await supabase.from('news').insert({
        title: title,
        brief: brief,
        content: content,
        picture: picture,
    });

    if (insertError) {
        throw createError({
            statusCode: 500,
            statusMessage: insertError.message,
        });
    }

    return { insertData, insertError };
});
