import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
export interface NotificationItem {
  message: string;
}

export function Notifications({
  messages,
  count,
}: {
  messages: NotificationItem[];
  count?: number;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 cursor-pointer" />
          <div className="flex items-center justify-center absolute top-0 right-0 h-[20px] w-[20px] rounded-full bg-red-500 text-white  text-[10px]">
            {count}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        {messages.map((message, index) => (
          <DropdownMenuItem key={index} className="cursor-pointer">
            {message.message}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
