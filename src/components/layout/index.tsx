import { siderbarMenus } from "@/types/sidebarMenus";
import AppSidebar from "../app-sidebar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

interface LayoutProps {
  siderbarMenus: siderbarMenus;
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ siderbarMenus, children }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="sidebar" siderbarMenus={siderbarMenus} />
      <SidebarInset>
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
