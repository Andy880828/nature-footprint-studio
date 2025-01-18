export default defineEventHandler(async (event) => {
    const supabase = useSupabase();
    // 從 request body 獲取數據
    const body = await readBody(event);
    const { name, category, description, quantity, price, picture } = body;
    const { data: insertData, error: insertError } = await supabase.from('product').insert({
        name: name,
        category: category,
        description: description,
        quantity: quantity,
        price: price,
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
