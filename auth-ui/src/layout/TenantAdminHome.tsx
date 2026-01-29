import { AppSidebar, type NavItem } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import FunctionsPage from "@/tenant-admin/pages/FunctionsPage";
import GroupsPage from "@/tenant-admin/pages/GroupsPage";
import UsersPage from "@/tenant-admin/pages/UsersPage";
import { useState } from "react";


export default function Page() {
  const [currentNavItem, setCurrentNavItem] = useState("users");

  const data: NavItem[] = [
    {
      id: "",
      title: "Security Management",
      items: [
        {
          id: "",
          title: "User Administration",
          url: "#",
          items: [
            { title: "User Maintenance", url: "#", id: "users" },
            { title: "User Group Maintenance", url: "#", id: "groups" },
            { title: "Function Maintenance", url: "#", id: "functions" },
            { title: "User – User Group Map", url: "#", id: "user-usergroup-map" },
            { title: "User Group – Function Map", url: "#", id: "usergroup-function-map" }
          ]
        },
        {
          id: "",
          title: "User Activity Report",
          url: "#",
          items: [
            { title: "Currently Logged In Users", url: "#", isActive: true, id: "currentUsers" },
            { title: "Disabled Users", url: "#", id: "" },
            { title: "Deleted Users", url: "#", id: "" },
          ],
        },
      ],
    },
  ]



  const handleItemSelected = (item: NavItem) => {
    console.log(item);
    setCurrentNavItem(item.id);
  }

  return (
    <SidebarProvider>
      <AppSidebar navData={data} onItemSelect={handleItemSelected} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {currentNavItem === 'users' && <UsersPage />}
          {currentNavItem === 'groups' && <GroupsPage />}
          {currentNavItem === 'functions' && <FunctionsPage />}

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
