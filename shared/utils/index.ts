import { createClient } from '@supabase/supabase-js';

export const useSupabase = () => {
    const runtimeConfig = useRuntimeConfig();
    const supabaseUrl = runtimeConfig.public.supabaseUrl;
    const supabaseKey = runtimeConfig.public.supabaseKey;
    return createClient(supabaseUrl as string, supabaseKey as string);
};
