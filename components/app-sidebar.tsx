"use client"

import {
  Bot,
  MessageSquare,
  Plus,
  Search,
  Video,
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { SidebarHistory } from "@/components/sidebar-history"
import { TeamSwitcher } from "@/components/team-switcher"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter, SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar
} from "@/components/ui/sidebar"
import { chatModels } from "@/lib/ai/models"
import type { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

export function AppSidebar({ 
  user,
  ...props 
}: { 
  user: User | undefined;
} & React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const { setOpenMobile } = useSidebar()
  const [searchQuery, setSearchQuery] = React.useState("")

  const teams = [
    {
      name: "Chat",
      logo: MessageSquare,
      plan: "Workspace",
      url: "/",
    },
    {
      name: "Studio",
      logo: Video,
      plan: "Workspace",
      url: "/studio",
    },
  ]

  const modelsNav = chatModels.map((model) => ({
    title: model.name,
    url: "#",
    description: model.description,
  }))

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Guest"
  const userEmail = user?.email || ""

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                setOpenMobile(false)
                router.push("/")
                router.refresh()
              }}
              tooltip="New Chat"
            >
              <Plus className="h-4 w-4" />
              <span>New chat</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex items-center gap-2 px-2">
                <Search className="h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 border-none shadow-none focus-visible:ring-0"
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain 
          items={[
            {
              title: "AI Models",
              url: "#",
              icon: Bot,
              isActive: false,
              items: modelsNav,
            },
          ]} 
        />
        <SidebarHistory user={user} searchQuery={searchQuery} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser 
          user={{
            name: userName,
            email: userEmail,
            avatar: user?.user_metadata?.avatar_url || "/avatars/default.jpg",
          }} 
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
