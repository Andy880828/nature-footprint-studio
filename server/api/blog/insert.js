export default defineEventHandler(async (event) => {
    const supabase = useSupabase();
    // 從 request body 獲取數據
    const body = await readBody(event);
    const { title, category, content, link, picture } = body;
    const { data: insertData, error: insertError } = await supabase.from('blog').insert({
        title: title,
        category: category,
        content: content,
        link: link,
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
