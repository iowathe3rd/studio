"use client";

import { PlusIcon } from "@/components/icons";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Film, Sparkles, Layout, FolderOpen } from "lucide-react";

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
            {/* New Project Button */}
            <Button
              className="w-full justify-start gap-2 h-9 text-sm font-medium"
              onClick={() => {
                setOpenMobile(false);
                router.push("/studio/new");
              }}
              variant="outline"
            >
              <PlusIcon size={16} />
              <span>New project</span>
            </Button>

            {/* Studio Title */}
            <div className="px-2 py-1">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                AI Studio
              </h2>
            </div>
          </div>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        {/* Navigation Items */}
        <SidebarGroup className="py-0">
          <SidebarGroupLabel className="px-2 text-xs text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href, item.exact)}
                    className="h-9"
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

        {/* Quick Actions */}
        <SidebarGroup className="py-0 mt-4">
          <SidebarGroupLabel className="px-2 text-xs text-muted-foreground">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 py-2 space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-8 text-xs"
                onClick={() => {
                  setOpenMobile(false);
                  router.push("/studio/new?type=text-to-image");
                }}
              >
                Generate Image
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-8 text-xs"
                onClick={() => {
                  setOpenMobile(false);
                  router.push("/studio/new?type=text-to-video");
                }}
              >
                Generate Video
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarUserNav user={user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
