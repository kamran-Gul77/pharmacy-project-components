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
      </SidebarContent>
      <SidebarFooter>
        {siderbarMenus?.user && <NavUser user={siderbarMenus.user} />}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
