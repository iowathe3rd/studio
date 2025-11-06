import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * OAuth Authentication Endpoint
 * 
 * ⚠️ STATUS: TEMPORARILY DISABLED - COMING SOON
 * This endpoint is currently deactivated while OAuth providers are being configured.
 * Supported providers: GitHub, Google, GitLab
 */
export async function GET(request: Request) {
  // TODO: Remove this when OAuth is ready
  return NextResponse.json(
    { error: "OAuth authentication is coming soon" },
    { status: 503 }
  );

  /* eslint-disable no-unreachable */
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider");
  const redirectTo = searchParams.get("redirectTo") || "/";

  if (!provider || !(["github", "google", "gitlab"] as const).includes(provider as any)) {
    return NextResponse.json(
      { error: "Invalid OAuth provider" },
      { status: 400 }
    );
  }
  /* eslint-enable no-unreachable */

  const supabase = await createSupabaseServerClient();
  const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider as "github" | "google" | "gitlab",
    options: {
      redirectTo: `${redirectUrl}?next=${encodeURIComponent(redirectTo)}`,
    },
  });

  if (error || !data.url) {
    console.error("OAuth sign in error:", error);
    return NextResponse.json(
      { error: "Failed to initialize OAuth" },
      { status: 500 }
    );
  }

  return NextResponse.redirect(data.url as string);
}
