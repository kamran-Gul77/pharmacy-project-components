"use client";

import * as React from "react";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDownIcon as IconChevronDown,
  ChevronLeftIcon as IconChevronLeft,
  ChevronRightIcon as IconChevronRight,
  ChevronsLeftIcon as IconChevronsLeft,
  ChevronsRightIcon as IconChevronsRight,
  FilterIcon,
  GripVerticalIcon as IconGripVertical,
  Columns2Icon as IconLayoutColumns,
  SearchIcon,
  DownloadIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// DragHandle component for row reordering
function DragHandle({ id }: { id: React.Key }) {
  const { attributes, listeners } = useSortable({
    id: id.toString(),
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

// DraggableRow component for drag and drop functionality
function DraggableRow<T>({ row }: { row: Row<T> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

// ExpandableRow component for row expansion
function ExpandableRow<T>({
  row,
  renderExpanded,
}: {
  row: Row<T>;
  renderExpanded: (row: Row<T>) => React.ReactNode;
}) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <>
      <TableRow
        data-state={row.getIsSelected() && "selected"}
        className={expanded ? "border-b-0" : ""}
        onClick={() => setExpanded(!expanded)}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
      {expanded && (
        <TableRow className="bg-muted/50">
          <TableCell colSpan={row.getVisibleCells().length} className="p-4">
            {renderExpanded(row)}
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export type TabConfig = {
  value: string;
  label: string;
  badge?: number;
  content?: React.ReactNode;
};

export type FilterOption = {
  id: string;
  label: string;
  options: { label: string; value: string }[];
};

export type ThemeConfig = {
  headerBackground?: string;
  rowHoverBackground?: string;
  selectedRowBackground?: string;
  borderColor?: string;
  textColor?: string;
  paginationButtonColor?: string;
};

export type DynamicDataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  idField: keyof T;
  enableDragAndDrop?: boolean;
  enableRowSelection?: boolean;
  enableColumnVisibility?: boolean;
  enablePagination?: boolean;
  enableSearch?: boolean;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableExport?: boolean;
  enableRowExpansion?: boolean;
  exportFileName?: string;
  searchPlaceholder?: string;
  searchField?: keyof T;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  tabs?: TabConfig[];
  defaultTab?: string;
  title?: string;
  actions?: React.ReactNode;
  filterOptions?: FilterOption[];
  theme?: ThemeConfig;
  renderExpandedRow?: (row: Row<T>) => React.ReactNode;
  onRowSelectionChange?: (rowSelection: Record<string, boolean>) => void;
  onDataChange?: (data: T[]) => void;
};

export function SNDataTable<T>({
  data: initialData,
  columns: userColumns,
  idField,
  enableDragAndDrop = false,
  enableRowSelection = false,
  enableColumnVisibility = false,
  enablePagination = false,
  enableSearch = false,
  enableSorting = true,
  enableFiltering = false,
  enableExport = false,
  enableRowExpansion = false,
  exportFileName = "table-data",
  searchPlaceholder = "Search...",
  searchField,
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],
  tabs,
  defaultTab,
  title,
  actions,
  filterOptions = [],
  theme = {},
  renderExpandedRow,
  onRowSelectionChange,
  onDataChange,
}: DynamicDataTableProps<T>) {
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  // Update data when initialData changes
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // Apply theme styles
  const themeStyles = {
    header: theme.headerBackground
      ? { backgroundColor: theme.headerBackground }
      : {},
    row: theme.rowHoverBackground
      ? { "&:hover": { backgroundColor: theme.rowHoverBackground } }
      : {},
    selectedRow: theme.selectedRowBackground
      ? {
          "&[data-state=selected]": {
            backgroundColor: theme.selectedRowBackground,
          },
        }
      : {},
    border: theme.borderColor ? { borderColor: theme.borderColor } : {},
    text: theme.textColor ? { color: theme.textColor } : {},
    paginationButton: theme.paginationButtonColor
      ? { color: theme.paginationButtonColor }
      : {},
  };

  // Build columns based on configuration
  const columns = React.useMemo(() => {
    const baseColumns: ColumnDef<T>[] = [];

    // Add expansion column if row expansion is enabled
    if (enableRowExpansion) {
      baseColumns.push({
        id: "expander",
        header: () => null,
        cell: ({ row }) => (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0"
            onClick={(e) => {
              e.stopPropagation();
              row.toggleExpanded();
            }}
          >
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${
                row.getIsExpanded() ? "rotate-180" : ""
              }`}
            />
          </Button>
        ),
      });
    }

    // Add drag handle column if drag and drop is enabled
    if (enableDragAndDrop) {
      baseColumns.push({
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.id} />,
      });
    }

    // Add selection column if row selection is enabled
    if (enableRowSelection) {
      baseColumns.push({
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }

    // Add user-defined columns
    return [...baseColumns, ...userColumns];
  }, [userColumns, enableDragAndDrop, enableRowSelection, enableRowExpansion]);

  // Get data IDs for sortable context
  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map((item) => String(item[idField])) || [],
    [data, idField]
  );

  // Initialize table
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
      globalFilter,
    },
    enableExpanding: enableRowExpansion,
    getRowId: (row) => String(row[idField]),
    enableRowSelection,
    enableSorting,
    onRowSelectionChange: (updatedRowSelection) => {
      setRowSelection(updatedRowSelection);
      onRowSelectionChange?.(updatedRowSelection as Record<string, boolean>);
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      if (value === null || value === undefined) return false;
      return String(value)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // Handle drag end for row reordering
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((currentData) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        const newData = arrayMove(currentData, oldIndex, newIndex);
        onDataChange?.(newData);
        return newData;
      });
    }
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGlobalFilter(value);

    // If searchField is provided, also set column filter
    if (searchField) {
      if (value) {
        setColumnFilters([{ id: searchField as string, value }]);
      } else {
        setColumnFilters([]);
      }
    }
  };

  // Handle export
  const handleExport = () => {
    // Get visible columns
    const visibleColumns = table.getVisibleLeafColumns();

    // Get headers
    const headers = visibleColumns.map((column) => {
      // Try to get a display name from the column def
      const headerObj = column.columnDef.header;
      if (typeof headerObj === "string") return headerObj;
      return column.id;
    });

    // Get data
    const rows = table.getFilteredRowModel().rows;
    const csvData = rows.map((row) => {
      return visibleColumns.map((column) => {
        const cell = row
          .getVisibleCells()
          .find((cell) => cell.column.id === column.id);
        if (!cell) return "";

        // Try to get the raw value
        const value = row.getValue(column.id);
        if (value === null || value === undefined) return "";
        return String(value);
      });
    });

    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${exportFileName}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render the table with or without tabs
  const renderTable = () => (
    <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        {enableSearch && (
          <div className="relative w-full md:w-72">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={globalFilter ?? ""}
              onChange={handleSearchChange}
              className="w-full pl-8"
            />
          </div>
        )}

        {/* Filters */}
        {enableFiltering && filterOptions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <Popover key={filter.id}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <FilterIcon className="h-3.5 w-3.5" />
                    <span>{filter.label}</span>
                    {table.getColumn(filter.id)?.getFilterValue() ? (
                      <Badge
                        variant="secondary"
                        className="rounded-sm px-1 font-normal"
                      >
                        1
                      </Badge>
                    ) : null}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2" align="start">
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        table.getColumn(filter.id)?.setFilterValue(null)
                      }
                      className="justify-start font-normal"
                    >
                      Clear
                    </Button>
                    <div className="flex flex-col gap-1">
                      {filter.options.map((option) => (
                        <Button
                          key={option.value}
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            table
                              .getColumn(filter.id)
                              ?.setFilterValue(option.value)
                          }
                          className={`justify-start font-normal ${
                            table.getColumn(filter.id)?.getFilterValue() ===
                            option.value
                              ? "bg-muted"
                              : ""
                          }`}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        )}

        {/* Export */}
        {enableExport && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="ml-auto"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        )}
      </div>

      <div
        className="overflow-hidden rounded-lg border"
        style={themeStyles.border}
      >
        {enableDragAndDrop ? (
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader
                className="bg-muted sticky top-0 z-10"
                style={themeStyles.header}
              >
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div
                            className={`flex items-center ${
                              header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : ""
                            }`}
                            onClick={
                              header.column.getCanSort()
                                ? header.column.getToggleSortingHandler()
                                : undefined
                            }
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <div className="ml-2">
                                {{
                                  asc: <ChevronUpIcon className="h-4 w-4" />,
                                  desc: <ChevronDownIcon className="h-4 w-4" />,
                                }[header.column.getIsSorted() as string] ?? (
                                  <ChevronUpIcon className="h-4 w-4 opacity-0" />
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        ) : enableRowExpansion && renderExpandedRow ? (
          <Table>
            <TableHeader
              className="bg-muted sticky top-0 z-10"
              style={themeStyles.header}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center ${
                            header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : ""
                          }`}
                          onClick={
                            header.column.getCanSort()
                              ? header.column.getToggleSortingHandler()
                              : undefined
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <div className="ml-2">
                              {{
                                asc: <ChevronUpIcon className="h-4 w-4" />,
                                desc: <ChevronDownIcon className="h-4 w-4" />,
                              }[header.column.getIsSorted() as string] ?? (
                                <ChevronUpIcon className="h-4 w-4 opacity-0" />
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table
                  .getRowModel()
                  .rows.map((row) => (
                    <ExpandableRow
                      key={row.id}
                      row={row}
                      renderExpanded={renderExpandedRow}
                    />
                  ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHeader
              className="bg-muted sticky top-0 z-10"
              style={themeStyles.header}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center ${
                            header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : ""
                          }`}
                          onClick={
                            header.column.getCanSort()
                              ? header.column.getToggleSortingHandler()
                              : undefined
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <div className="ml-2">
                              {{
                                asc: <ChevronUpIcon className="h-4 w-4" />,
                                desc: <ChevronDownIcon className="h-4 w-4" />,
                              }[header.column.getIsSorted() as string] ?? (
                                <ChevronUpIcon className="h-4 w-4 opacity-0" />
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    style={
                      {
                        ...themeStyles.row,
                        ...(row.getIsSelected() ? themeStyles.selectedRow : {}),
                      } as React.CSSProperties
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} style={themeStyles.text}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      {enablePagination && (
        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {enableRowSelection && (
              <>
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </>
            )}
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="flex items-center gap-2">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                style={themeStyles.paginationButton}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                style={themeStyles.paginationButton}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                style={themeStyles.paginationButton}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                style={themeStyles.paginationButton}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // If tabs are provided, render with tabs
  if (tabs && tabs.length > 0) {
    return (
      <Tabs
        defaultValue={defaultTab || tabs[0].value}
        className="w-full flex-col justify-start gap-6"
      >
        <div className="flex items-center justify-between px-4 lg:px-6">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}{" "}
                {tab.badge && <Badge variant="secondary">{tab.badge}</Badge>}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex items-center gap-2">
            {enableColumnVisibility && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <IconLayoutColumns className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">Customize Columns</span>
                    <span className="lg:hidden">Columns</span>
                    <IconChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {table
                    .getAllColumns()
                    .filter(
                      (column) =>
                        typeof column.accessorFn !== "undefined" &&
                        column.getCanHide()
                    )
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {actions}
          </div>
        </div>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.value === tabs[0].value ? renderTable() : tab.content}
          </TabsContent>
        ))}
      </Tabs>
    );
  }

  // Otherwise, render just the table with header
  return (
    <div className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6 mb-4">
        {title && <h2 className="text-lg font-semibold">{title}</h2>}
        <div className="flex items-center gap-2">
          {enableColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <IconLayoutColumns className="h-4 w-4 mr-2" />
                  <span className="hidden lg:inline">Customize Columns</span>
                  <span className="lg:hidden">Columns</span>
                  <IconChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== "undefined" &&
                      column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {actions}
        </div>
      </div>
      {renderTable()}
    </div>
  );
}
