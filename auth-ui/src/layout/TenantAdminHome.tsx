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

import navData from "./tenantAdminNavigationTree.json"

export default function Page() {
  const [currentNavItem, setCurrentNavItem] = useState("users");



  const handleItemSelected = (item: NavItem) => {
    console.log(item);
    if(item.id){
      setCurrentNavItem(item.id);
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar navData={navData} onItemSelect={handleItemSelected} />
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
