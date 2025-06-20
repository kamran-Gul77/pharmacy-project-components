import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export type ContextMenuItemType = {
  label: string;
  onClick?: () => void;
};

export function SNContextMenu({
  items,
  children,
}: {
  items: ContextMenuItemType[];
  children: React.ReactNode;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        {items.map((item, index) => (
          <ContextMenuItem key={index} onClick={item.onClick}>
            {item.label}
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}
