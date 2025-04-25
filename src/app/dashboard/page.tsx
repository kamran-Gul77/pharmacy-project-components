import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";
import AppSidebar from "@/components/app-sidebar";
import { sidebarData } from "@/lib/sidebarMenu";
import { StatCard } from "@/components/section-cards";
type TrendType = "up" | "down";

const cardsData: {
  title: string;
  value: string;
  badgeValue: string;
  trend: TrendType;
  footerPrimary: string;
  footerSecondary: string;
}[] = [
  {
    title: "Total Revenue",
    value: "$1,250.00",
    badgeValue: "+12.5%",
    trend: "up",
    footerPrimary: "Trending up this month",
    footerSecondary: "Visitors for the last 6 months",
  },
  {
    title: "New Customers",
    value: "1,234",
    badgeValue: "-20%",
    trend: "down",
    footerPrimary: "Down 20% this period",
    footerSecondary: "Acquisition needs attention",
  },
  {
    title: "Active Accounts",
    value: "45,678",
    badgeValue: "+12.5%",
    trend: "up",
    footerPrimary: "Strong user retention",
    footerSecondary: "Engagement exceed targets",
  },
  {
    title: "Growth Rate",
    value: "4.5%",
    badgeValue: "+4.5%",
    trend: "up",
    footerPrimary: "Steady performance increase",
    footerSecondary: "Meets growth projections",
  },
];
export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="sidebar" siderbarMenus={sidebarData} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="grid grid-col-3 gap-4 py-4 md:gap-6 md:py-6">
              {cardsData.map((card, index) => (
                <StatCard key={index} {...card} />
              ))}{" "}
            </div>
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
