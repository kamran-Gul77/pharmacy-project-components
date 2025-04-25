"use client";

import { type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavMainProps {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}

const NavMain: React.FC<NavMainProps> = ({ items }) => {
  const router = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = router === item.url;

            return (
              <SidebarMenuItem
                key={item.title}
                className={
                  isActive ? "bg-[#464646] text-[#fff] rounded-[8px]" : ""
                }
              >
                <Link href={item.url}>
                  <SidebarMenuButton
                    className="cursor-pointer"
                    tooltip={item.title}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavMain;
