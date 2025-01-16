export default defineEventHandler(async (event) => {
    const supabase = useSupabase();
    const { data, error } = await supabase.from('picture').select('*');
    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message,
        });
    }
    const updatePicture = async (id, picture, display) => {
        const { data, error } = await supabase
            .from('picture')
            .update({ picture: picture, display: display })
            .eq('id', id);
        if (error) {
            throw createError({
                statusCode: 500,
                statusMessage: error.message,
            });
        }
        return data;
    };
    const deletePicture = async (id) => {
        const { data, error } = await supabase.from('picture').delete().eq('id', id);
        if (error) {
            throw createError({
                statusCode: 500,
                statusMessage: error.message,
            });
        }
        return data;
    };
    return data;
});
