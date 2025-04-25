"use client";

import * as React from "react";
import { IconInnerShadowTop } from "@tabler/icons-react";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import NavMain from "./nav-main";
import { siderbarMenus } from "@/types/sidebarMenus";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  siderbarMenus: siderbarMenus;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ siderbarMenus, ...props }) => {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={siderbarMenus.navMain.map((item) => ({
            ...item,
            icon: () => (
              <Image
                src={item.icon.src}
                alt={item.title}
                width={16}
                height={16}
              />
            ),
          }))}
        />
        {/* <NavDocuments
          items={dashboardData.documents.map((doc) => ({
            ...doc,
            icon: () => (
              <Image src={doc.icon.src} alt={doc.name} width={16} height={16} />
            ),
          }))}
        />
        <NavSecondary
          items={dashboardData.navSecondary.map((item) => ({
            ...item,
            icon: () => (
              <Image
                src={item.icon.src}
                alt={item.title}
                width={16}
                height={16}
              />
            ),
          }))}
          className="mt-auto"
        /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={siderbarMenus.user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
