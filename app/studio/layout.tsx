import { StudioSidebar } from "@/components/studio/studio-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUser } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const cookieStore = await cookies();
  const isCollapsed = cookieStore.get("sidebar_state")?.value === "false";

  return (
    <SidebarProvider defaultOpen={!isCollapsed} className="flex min-h-screen">
      <StudioSidebar user={user} />
      <SidebarInset className="flex-1">{children}</SidebarInset>
    </SidebarProvider>
  );
}
