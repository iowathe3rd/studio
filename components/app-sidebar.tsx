"use client";

import { PlusIcon, TrashIcon } from "@/components/icons";
import { SidebarHistory, getChatHistoryPaginationKey } from "@/components/sidebar-history";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { unstable_serialize } from "swr/infinite";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./ui/alert-dialog";
import { Search } from "lucide-react";

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const { mutate } = useSWRConfig();
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteAll = () => {
    const deletePromise = fetch("/api/history", {
      method: "DELETE",
    });

    toast.promise(deletePromise, {
      loading: "Deleting all chats...",
      success: () => {
        mutate(unstable_serialize(getChatHistoryPaginationKey));
        router.push("/");
        setShowDeleteAllDialog(false);
        return "All chats deleted successfully";
      },
      error: "Failed to delete all chats",
    });
  };

  return (
    <>
      <Sidebar className="group-data-[side=left]:border-r-0">
        <SidebarHeader className="border-b border-sidebar-border">
          <SidebarMenu>
            <div className="flex flex-col gap-2 px-2 py-2">
              {/* New Chat Button */}
              <Button
                className="w-full justify-start gap-2 h-9 text-sm font-medium"
                onClick={() => {
                  setOpenMobile(false);
                  router.push("/");
                  router.refresh();
                }}
                variant="outline"
              >
                <PlusIcon size={16} />
                <span>New chat</span>
              </Button>

              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search chats"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-9 text-sm border-input bg-transparent"
                />
              </div>
            </div>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="px-2 py-2">
          {/* Navigation Items */}
          <SidebarGroup className="py-0">
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="h-8 text-sm">
                    <Link href="/" onClick={() => setOpenMobile(false)}>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span>Library</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="h-8 text-sm">
                    <Link href="/" onClick={() => setOpenMobile(false)}>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      <span>Studio</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="h-8 text-sm">
                    <Link href="/" onClick={() => setOpenMobile(false)}>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Atlas</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Agents Section */}
          <SidebarGroup className="py-2">
            <SidebarGroupLabel className="px-2 text-xs text-muted-foreground font-normal tracking-tight mb-1 flex items-center gap-1.5">
              <span>Agents</span>
              <span className="text-[10px] rounded-md border border-sidebar-border bg-muted px-1.5 py-0.5">
                Coming soon
              </span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                <SidebarMenuItem>
                  <SidebarMenuButton disabled className="h-8 text-sm opacity-50 cursor-not-allowed">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    <span>Explore</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton disabled className="h-8 text-sm opacity-50 cursor-not-allowed">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-sidebar-border bg-muted text-[10px]">
                      📈
                    </div>
                    <span className="truncate text-sm">Finance & Economics</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton disabled className="h-8 text-sm opacity-50 cursor-not-allowed">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-sidebar-border bg-muted text-[10px]">
                      🏗️
                    </div>
                    <span className="truncate text-sm">Software Architect</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton disabled className="h-8 text-sm opacity-50 cursor-not-allowed">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-sidebar-border bg-muted text-[10px]">
                      🧜
                    </div>
                    <span className="truncate text-sm">Mermaid Chart</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Projects Section */}
          <SidebarGroup className="py-2">
            <SidebarGroupLabel className="px-2 text-xs text-muted-foreground font-normal tracking-tight mb-1 flex items-center gap-1.5">
              <span>Projects</span>
              <span className="text-[10px] rounded-md border border-sidebar-border bg-muted px-1.5 py-0.5">
                Coming soon
              </span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                <SidebarMenuItem>
                  <SidebarMenuButton disabled className="h-8 text-sm opacity-50 cursor-not-allowed">
                    <PlusIcon size={16} />
                    <span>New project</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton disabled className="h-8 text-sm opacity-50 cursor-not-allowed">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span>Elesar</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton disabled className="h-8 text-sm opacity-50 cursor-not-allowed">
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-sidebar-border bg-muted text-[10px] font-semibold">
                      $
                    </div>
                    <span>Frame</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton disabled className="h-8 text-sm opacity-50 cursor-not-allowed">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span>Я</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton disabled className="h-8 text-sm opacity-50 cursor-not-allowed">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span>RTS</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Chats Section */}
          <SidebarGroup className="py-2">
            <SidebarGroupLabel className="group/label px-2 text-xs text-muted-foreground font-normal tracking-tight mb-1 flex items-center justify-between">
              <span>Chats</span>
              {user && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 opacity-0 group-hover/label:opacity-100 transition-opacity"
                  onClick={() => setShowDeleteAllDialog(true)}
                >
                  <TrashIcon size={12} />
                </Button>
              )}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarHistory user={user} searchQuery={searchQuery} />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border p-2">
          {user && <SidebarUserNav user={user} />}
        </SidebarFooter>
      </Sidebar>

      <AlertDialog onOpenChange={setShowDeleteAllDialog} open={showDeleteAllDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete all chats?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all your
              chats and remove them from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAll}>
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
