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
import { useMemo, useState } from "react";

import navData from "./systemAdminNavigationTree.json"
import TenantsPage from "@/system-admin/pages/TenantsPage";
import React from "react";

export default function Page() {
    const [currentNavItem, setCurrentNavItem] = useState<NavItem | null>(null)

    const handleItemSelected = (item: NavItem) => {
        console.log(item);
        if (item) {
            setCurrentNavItem(item);
        }
    }

    function findPath(
        items: NavItem[],
        targetId: string,
        path: NavItem[] = []
    ): NavItem[] | null {
        for (const item of items) {
            const newPath = [...path, item]

            if (item.id === targetId) return newPath

            if (item.items) {
                const result = findPath(item.items, targetId, newPath)
                if (result) return result
            }
        }
        return null
    }

    const breadcrumbPath = useMemo(() => {
        if (!currentNavItem?.id) return []
        return findPath(navData, currentNavItem.id) || []
    }, [currentNavItem?.id])




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
                            {breadcrumbPath.map((item, index) => {
                                const isLast = index === breadcrumbPath.length - 1

                                return (
                                    <React.Fragment key={item.id}>
                                        <BreadcrumbItem>
                                            {isLast ? (
                                                <BreadcrumbPage>{item.title}</BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink href="#">{item.title}</BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                        {!isLast && <BreadcrumbSeparator />}
                                    </React.Fragment>
                                )
                            })}
                        </BreadcrumbList>
                    </Breadcrumb>

                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {currentNavItem?.id === "tenants" && <TenantsPage />}

                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
