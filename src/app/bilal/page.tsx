"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import React, { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { SNTooltip } from "@/components/elements/SNTooltip";
import { SNTabs, TabItem } from "@/components/elements/SNTabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import Input from "@/components/elements/Input";
import {
  ContextMenuItemType,
  SNContextMenu,
} from "@/components/elements/SNContextMenu";
import {
  NotificationItem,
  Notifications,
} from "@/components/elements/Notifications";
import { SNDataTable } from "@/components/table/SNDataTable";
const Page = () => {
  // This type is used to define the shape of our data.
  // You can use a Zod schema here if you want.
  const menuItems: ContextMenuItemType[] = [
    { label: "Profile", onClick: () => console.log("Profile clicked") },
    { label: "Billing", onClick: () => console.log("Billing clicked") },
    { label: "Team", onClick: () => console.log("Team clicked") },
    {
      label: "Subscription",
      onClick: () => console.log("Subscription clicked"),
    },
  ];

  const notifications: NotificationItem[] = [
    {
      message: "Hi You Got Fired",
    },
    {
      message: "Elon Musk Coming to Tensai Devs",
    },
    {
      message: "Bill Gates want to hire Zaid for Microsoft",
    },
    {
      message: "India Send millions Loves",
    },
    {
      message: "You have love request",
    },
  ];
  const tabsData: TabItem[] = [
    {
      label: "Account",
      value: "account",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you are done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      ),
    },
    {
      label: "Password",
      value: "password",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you will be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      ),
    },
    {
      label: "third tab",
      value: "third tab",
      content: (
        <div className="space-y-2">
          Hello this is the third tab. You can put any content here.
        </div>
      ),
    },
  ];

  interface Payment {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  }

  const data: Payment[] = [
    {
      id: "1",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
    },
    {
      id: "2",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
    },
    {
      id: "3",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
    },
    {
      id: "4",
      amount: 874,
      status: "success",
      email: "Silas22@example.com",
    },
    {
      id: "5",
      amount: 721,
      status: "failed",
      email: "carmella@example.com",
    },
    {
      id: "6",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
    },
    {
      id: "7",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
    },
    {
      id: "8",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
    },
    {
      id: "9",
      amount: 874,
      status: "success",
      email: "Silas22@example.com",
    },
    {
      id: "10",
      amount: 721,
      status: "failed",
      email: "carmella@example.com",
    },
    {
      id: "11",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
    },
    {
      id: "12",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
    },
    {
      id: "13",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
    },
    {
      id: "14",
      amount: 874,
      status: "success",
      email: "Silas22@example.com",
    },
    {
      id: "15",
      amount: 721,
      status: "failed",
      email: "carmella@example.com",
    },
  ];

  interface IPDetails {
    name: string;
    mobeile: string;
    address: string;
  }
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
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
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
                onClick={() => navigator.clipboard.writeText(payment.id)}
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
  const [items, setItems] = React.useState<string[]>([]);
  const [newItems, setNewItems] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState<string[]>([]);
  const [filteredDetails, setFilteredDetails] = React.useState<IPDetails[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    if (!searchQuery) {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => {
        return item.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredItems(filtered);
    }
  }, [items, searchQuery]);

  useEffect(() => {
    const persondetail: IPDetails[] = [
      {
        name: "Zaid",
        mobeile: "1234567890",
        address: "Bedadi",
      },
      {
        name: "Bilal",
        mobeile: "03411212111",
        address: "Makria",
      },
      {
        name: "Kami",
        mobeile: "03321232333",
        address: "Khanderi",
      },
      {
        name: "Ahmad",
        mobeile: "03456565555",
        address: "Guffan",
      },
    ];

    if (!searchQuery) {
      return setFilteredDetails(persondetail);
    } else {
      const filtered = persondetail.filter((p) => {
        return (
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.mobeile.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredDetails(filtered);
    }
  }, [searchQuery]);

  /////////Using Form
  // const inputRef = useRef<HTMLInputElement>(null);
  // const onsubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const value = inputRef.current?.value;
  //   if (!value) return;
  //   setItems((prev) => [...prev, value]);
  //   if (inputRef.current) {
  //     inputRef.current.value = "";
  //   }
  // };
  const handleAddItem = () => {
    if (newItems.trim() === "") return;
    setItems((prev) => [...prev, newItems]);
    setNewItems("");
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 items-center mt-8 mb-8">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="search here"
          type="search"
          className=""
        />
        <Button onClick={() => setSearchQuery("")}>Clear</Button>
      </div>

      <div>
        <input
          type="text"
          value={newItems}
          onChange={(e) => setNewItems(e.target.value)}
          placeholder="text"
          className="mb-3"
        />
        <Button onClick={handleAddItem}>Add Item</Button>
      </div>
      {filteredItems.length === 0 && (
        <div>
          {items.length === 0 ? "No Items Added yet!" : "No Items Found"}
        </div>
      )}
      <div>
        {filteredItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2">
            <span>{item}</span>
            <Button
              onClick={() => setItems(items.filter((_, i) => i !== index))}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      <div className="p-4">
        <h1>Personal Details</h1>
        {filteredDetails.map((person, i) => {
          return (
            <div key={i} className="flex items-center justify-between p-2">
              <span>{person.name}</span>
              <span>{person.mobeile}</span>
              <span>{person.address}</span>
            </div>
          );
        })}
      </div>
      <div className="min-h-screen"></div>
      <Notifications messages={notifications} count={notifications.length} />
      <SNTabs tabs={tabsData} className="mb-20" />
      <SNContextMenu items={menuItems}>
        <Button>Click Me!</Button>
      </SNContextMenu>
      <SNTooltip text="Tooltip">
        <Button>Hello Boy</Button>
      </SNTooltip>
      <div className="min-h-screen"></div>
      <SNDataTable idField="id" columns={columns} data={data} />
    </div>
  );
};

export default Page;
