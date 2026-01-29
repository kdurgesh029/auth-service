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

export type NavItem = {
  id: string              // 👈 important for tracking clicks
  title: string
  url?: string
  icon?: React.ReactNode
  isActive?: boolean
  items?: NavItem[]
}

export type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  navData: NavItem[]
  onItemSelect?: (item: NavItem) => void
}



function RenderNavItem({
  item,
  onItemSelect,
}: {
  item: NavItem
  onItemSelect?: (item: NavItem) => void
}) {
  const hasChildren = !!item.items?.length

  if (!hasChildren) {
    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          isActive={item.isActive}
          className="h-auto whitespace-normal text-left leading-snug"
          onClick={() => onItemSelect?.(item)}
        >
          {item.title}
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    )
  }

  // 🔹 PARENT NODE
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
              <RenderNavItem
                key={child.id}
                item={child}
                onItemSelect={onItemSelect}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuSubItem>
    </Collapsible>
  )
}



export function AppSidebar({
  navData,
  onItemSelect,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">Application Administration</span>
                <span>v1.0.0</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navData.map((item) => (
              <Collapsible key={item.id} defaultOpen className="group">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="h-auto whitespace-normal text-left">
                      {item.title}
                      <Plus className="ml-auto group-data-[state=open]:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  {item.items?.length && (
                    <CollapsibleContent className="overflow-visible">
                      <SidebarMenuSub className="ml-4 mt-1 space-y-1">
                        {item.items.map((child) => (
                          <RenderNavItem
                            key={child.id}
                            item={child}
                            onItemSelect={onItemSelect}
                          />
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
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

