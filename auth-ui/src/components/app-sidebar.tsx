import * as React from "react"
import { GalleryVerticalEnd, Minus, Plus } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "./NavUser"

type NavItem = {
  title: string
  url: string
  isActive?: boolean
  items?: NavItem[]
}

const data: { navMain: NavItem[] } = {
  navMain: [
    {
      title: "Security Management",
      url: "#",
      items: [
        {
          title: "User Administration",
          url: "#",
          items: [
            { title: "User Maintenance", url: "#" },
            { title: "User Group Maintenance", url: "#" },
            { title: "Function Maintenance", url: "#" },
            { title: "User – User Group Map", url: "#" },
            { title: "User Group – Function Map", url: "#" },
          ],
        },
        {
          title: "User Activity Report",
          url: "#",
          items: [
            { title: "Currently Logged In Users", url: "#", isActive: true },
            { title: "Disabled Users", url: "#" },
            { title: "Deleted Users", url: "#" },
          ],
        },
      ],
    },
  ],
}

function RenderNavItem({ item }: { item: NavItem }) {
  const hasChildren = !!item.items?.length

  if (!hasChildren) {
    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild isActive={item.isActive} className="h-auto whitespace-normal text-left leading-snug">
          <a href={item.url}>{item.title}</a>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    )
  }

  return (
    <Collapsible className="group w-full">
      <SidebarMenuSubItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuSubButton className="h-auto whitespace-normal text-left leading-snug">
            {item.title}
            <Plus className="ml-auto group-data-[state=open]:hidden" />
            <Minus className="ml-auto group-data-[state=closed]:hidden" />
          </SidebarMenuSubButton>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-visible">
          <SidebarMenuSub className="ml-4 mt-1 space-y-1">
            {item.items!.map((child) => (
              <RenderNavItem key={child.title} item={child} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuSubItem>
    </Collapsible>


  )
}


export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Application Administration</span>
                  <span>v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* <SearchForm /> */}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <Collapsible
                key={item.title}
                defaultOpen
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  {item.items?.length && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((child) => (
                          <RenderNavItem key={child.title} item={child} />
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: "shadcn",
          email: "m@example.com",
          avatar: "/avatars/shadcn.jpg"
        }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
