import { createSupabaseBrowserClient } from "./browser";
import { createSupabaseServerClient } from "./server";

export const supabaseServerClient = createSupabaseServerClient;
export const supabaseBrowserClient = createSupabaseBrowserClient;
