"use client";
import React from "react";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import data from "./data.json";
import AppSidebar from "@/components/app-sidebar";
import { sidebarData } from "@/lib/sidebarMenu";
import { StatCard } from "@/components/section-cards";
import { SNDataTable } from "@/components/table/SNDataTable";
import Button from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
type Payment = {
  id: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
};
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    footerSecondary: "Visitorss for the last 6 months",
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
const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(payment.id))}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
        <div>header goes here</div>
        <div className="flex flex-1 flex-col ">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {cardsData.map((card, index) => (
                <StatCard key={index} {...card} />
              ))}
            </div>

            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <SNDataTable
              enablePagination
              idField="id"
              columns={columns}
              data={data}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
