
import { cn } from "@/lib/utils";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    PaginationState,

    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from "@/components/ui/pagination";

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Pencil, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Salle } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { Button } from "../../button";
import { usePagination } from "@/hooks/use-pagination";
import { AddSalle } from "./Add";
import { EditSalle } from "./Edit";
import { Input } from "../../input";


interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    salles: Salle[];
}


export function SalleData() {
    const columns: ColumnDef<Salle>[] = [
        {
            header: "Salle",
            accessorKey: "salle",
            cell: ({ row }) => (
                <div className="truncate font-medium">{row.getValue("salle")}</div>
            ),
            sortUndefined: "last",
            sortDescFirst: false,
        },
        {
            header: "Capacity",
            accessorKey: "capacite",
        },
        {
            header: "Created At",
            accessorKey: "created_at",
            cell: ({ row }) => {
                const date = new Date(row.getValue("created_at"));
                return date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
            },
        },
        {
            header: "Action",
            cell: ({ row }) => {
                const salle = row.original;

                return (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(salle)}
                        >
                            <Pencil className="size-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(salle)}
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    </div>
                );
            },
        }

    ];
    const { salles } = usePage<CustomPageProps>().props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, setData] = useState<Salle[]>([])

    const pageSize = 10;

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize,
    });

    const [sorting, setSorting] = useState<SortingState>([
        {
            id: "salle",
            desc: false,
        },
    ]);

    useEffect(() => {
        if (salles && salles.length > 0) {
            setData(salles);
        }
    }, [salles]);

    const { delete: destroy } = useForm({});
    const [openDialogue, setOpenDialogue] = useState(false)
    const [selectedSalle, setSelectedSalle] = useState<Salle | null>(null)

    const handleDelete = (salle: Salle) => {
        const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer ${salle.salle} ?`);
        if (confirmDelete) {
            destroy(route('dashboard.salle.delete', salle.id), {
                preserveScroll: true,
            });
        }
    };
    const HanddleOpenDialogue = () => {
        setOpenDialogue((prev) => !prev)
    }

    const handleEdit = (salle: Salle) => {
        setOpenDialogue((prev) => !prev)
        setSelectedSalle(salle)

        setOpenDialogue(true)
    }
    const [searchTerm, setSearchTerm] = useState("")

    const filteredSalles = useMemo(() => {
        return salles.filter((salle) =>
            salle.salle.toLowerCase().includes(searchTerm.toLowerCase()),
        )
    }, [salles, searchTerm])
    const table = useReactTable({
        data: filteredSalles,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        enableSortingRemoval: false,
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            sorting,
            pagination,
        },
    });

    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
        currentPage: table.getState().pagination.pageIndex + 1,
        totalPages: table.getPageCount(),
        paginationItemsToDisplay: 5,
    });

    return (
        <div className="space-y-4 p-5">
            <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">
                    <AddSalle />
                    <EditSalle openDialogue={openDialogue} onOpenChange={HanddleOpenDialogue} salle={selectedSalle} />

                </div>
                <Input
                    placeholder="Search Salles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="md:w-96"
                />
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-background">
                <Table className="table-fixed">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            style={{ width: `${header.getSize()}px` }}
                                            className="h-11"
                                        >
                                            {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                                <div
                                                    className={cn(
                                                        header.column.getCanSort() &&
                                                        "flex h-full cursor-pointer select-none items-center justify-between gap-2",
                                                    )}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    onKeyDown={(e) => {
                                                        if (
                                                            header.column.getCanSort() &&
                                                            (e.key === "Enter" || e.key === " ")
                                                        ) {
                                                            e.preventDefault();
                                                            header.column.getToggleSortingHandler()?.(e);
                                                        }
                                                    }}
                                                    tabIndex={header.column.getCanSort() ? 0 : undefined}
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {{
                                                        asc: (
                                                            <ChevronUp
                                                                className="shrink-0 opacity-60"
                                                                size={16}
                                                                strokeWidth={2}
                                                                aria-hidden="true"
                                                            />
                                                        ),
                                                        desc: (
                                                            <ChevronDown
                                                                className="shrink-0 opacity-60"
                                                                size={16}
                                                                strokeWidth={2}
                                                                aria-hidden="true"
                                                            />
                                                        ),
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            ) : (
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between gap-3 max-sm:flex-col">
                {/* Page number information */}
                <p className="flex-1 whitespace-nowrap text-sm text-muted-foreground" aria-live="polite">
                    Page <span className="text-foreground">{table.getState().pagination.pageIndex + 1}</span>{" "}
                    of <span className="text-foreground">{table.getPageCount()}</span>
                </p>

                <div className="grow">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    aria-label="Go to previous page"
                                >
                                    <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
                                </Button>
                            </PaginationItem>
                            {showLeftEllipsis && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}
                            {pages.map((page) => {
                                const isActive = page === table.getState().pagination.pageIndex + 1;
                                return (
                                    <PaginationItem key={page}>
                                        <Button
                                            size="icon"
                                            variant={`${isActive ? "outline" : "ghost"}`}
                                            onClick={() => table.setPageIndex(page - 1)}
                                            aria-current={isActive ? "page" : undefined}
                                        >
                                            {page}
                                        </Button>
                                    </PaginationItem>
                                );
                            })}
                            {showRightEllipsis && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    aria-label="Go to next page"
                                >
                                    <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>


            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">

                <a
                    className="underline hover:text-foreground"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Mercure University
                </a>
            </p>
        </div>
    );
}


