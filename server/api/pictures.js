export default defineEventHandler(async (event) => {
    const supabase = useSupabase();
    const { data, error } = await supabase.from('picture').select('*');
    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message,
        });
    }
    return data;
});
