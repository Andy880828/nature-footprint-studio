export default defineEventHandler(async (event) => {
    const supabase = useSupabase();
    const { id } = await readBody(event);
    const { data: deleteData, error: deleteError } = await supabase.from('news').delete().eq('id', id);

    if (deleteError) {
        throw createError({
            statusCode: 500,
            statusMessage: deleteError.message,
        });
    }

    return { deleteData, deleteError };
});
