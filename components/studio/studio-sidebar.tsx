"use client";

import { SidebarUserNav } from "@/components/sidebar-user-nav";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type { User } from "@supabase/supabase-js";
import { Film, FolderOpen, Layout, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function StudioSidebar({ user }: { user: User }) {
  const router = useRouter();
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const navigation = [
    {
      name: "Projects",
      href: "/studio",
      icon: FolderOpen,
      exact: true,
    },
    {
      name: "Templates",
      href: "/studio/templates",
      icon: Layout,
    },
    {
      name: "Generations",
      href: "/studio/generations",
      icon: Sparkles,
    },
    {
      name: "Assets",
      href: "/studio/assets",
      icon: Film,
    },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <Sidebar className="group-data-[side=left]:border-r-0">
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <div className="flex flex-col gap-2 px-2 py-2">
            <Button
              className="w-full justify-start gap-2 h-9 text-sm font-medium"
              onClick={() => {
                setOpenMobile(false);
                router.push("/studio/new");
              }}
              variant="outline"
            >
              <Plus className="h-4 w-4" />
              <span>New project</span>
            </Button>
          </div>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        <SidebarGroup className="py-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href, item.exact)}
                    className="h-8 text-sm"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpenMobile(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="py-2">
          <SidebarGroupLabel className="px-2 text-xs text-muted-foreground font-normal tracking-tight mb-1">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="h-8 text-sm"
                  onClick={() => {
                    setOpenMobile(false);
                    router.push("/studio/new?type=text-to-image");
                  }}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Image</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="h-8 text-sm"
                  onClick={() => {
                    setOpenMobile(false);
                    router.push("/studio/new?type=text-to-video");
                  }}
                >
                  <Film className="h-4 w-4" />
                  <span>Generate Video</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarUserNav user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
