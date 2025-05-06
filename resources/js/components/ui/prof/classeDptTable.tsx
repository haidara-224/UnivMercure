import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/use-pagination";
import { PaginationState } from "@tanstack/react-table";
import { EmploieTemps } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";


interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    classeDepartement: EmploieTemps[];
}

type SortColumn = keyof EmploieTemps;

function SalleData() {
    const { classeDepartement } = usePage<CustomPageProps>().props
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState<SortColumn>("jour");
    const [sortDirection, setSortDirection] = useState("asc");



    const pageSize = 7;
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize,
    });

    const filteredMatiere = useMemo(() => {
        return classeDepartement.filter((m) =>
            m.annees_scolaire.annee_scolaire.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [classeDepartement, searchTerm]);
    useEffect(() => {
        console.log(classeDepartement)
    }
        , [classeDepartement])

    const sortedMatiere = useMemo(() => {
        return [...filteredMatiere].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
            if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredMatiere, sortColumn, sortDirection]);

    const paginatedMatiere = useMemo(() => {
        const start = pagination.pageIndex * pageSize;
        return sortedMatiere.slice(start, start + pageSize);
    }, [sortedMatiere, pagination, pageSize]);

    const totalPages = Math.ceil(sortedMatiere.length / pageSize);

    const handleSort = (column: SortColumn) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    };

    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
        currentPage: pagination.pageIndex + 1,
        totalPages: totalPages,
        paginationItemsToDisplay: 5,
    });
    useEffect(() => {
        console.log(classeDepartement)
    }, [classeDepartement])

    return (
        <div className="mx-auto my-6 w-full max-w-6xl rounded border p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                <h1 className="text-xl font-bold">Années Scolaire</h1>
                <Input
                    placeholder="Search Annees Scolaire..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                    }}
                    className="md:w-96"
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort("annees_scolaire")}
                        >
                            Annees Scolaire{" "}
                            {sortColumn === "annees_scolaire" && (
                                <span className="ml-1">
                                    {sortDirection === "desc" ? "\u2191" : "\u2193"}
                                </span>
                            )}
                        </TableHead>
                        <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort("module")}
                        >
                            module{" "}
                            {sortColumn === "module" && (
                                <span className="ml-1">
                                    {sortDirection === "asc" ? "\u2191" : "\u2193"}
                                </span>
                            )}
                        </TableHead>
                        <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort("jour")}
                        >
                            Jours{" "}
                            {sortColumn === "jour" && (
                                <span className="ml-1">
                                    {sortDirection === "asc" ? "\u2191" : "\u2193"}
                                </span>
                            )}
                        </TableHead>
                        <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort("classes")}
                        >
                            classes{" "}
                            {sortColumn === "classes" && (
                                <span className="ml-1">
                                    {sortDirection === "asc" ? "\u2191" : "\u2193"}
                                </span>
                            )}
                        </TableHead>
                        <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort("departement")}
                        >
                            departement{" "}
                            {sortColumn === "departement" && (
                                <span className="ml-1">
                                    {sortDirection === "asc" ? "\u2191" : "\u2193"}
                                </span>
                            )}
                        </TableHead>
                        <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort("matiere")}
                        >
                            matiere{" "}
                            {sortColumn === "matiere" && (
                                <span className="ml-1">
                                    {sortDirection === "asc" ? "\u2191" : "\u2193"}
                                </span>
                            )}
                        </TableHead>
                        <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort("matiere")}
                        >
                            salle{" "}
                            {sortColumn === "salle" && (
                                <span className="ml-1">
                                    {sortDirection === "asc" ? "\u2191" : "\u2193"}
                                </span>
                            )}
                        </TableHead>
                        <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort("heure_debut")}
                        >
                            Temps{" "}
                            {sortColumn === "heure_debut" && (
                                <span className="ml-1">
                                    {sortDirection === "asc" ? "\u2191" : "\u2193"}
                                </span>
                            )}
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedMatiere.length > 0 ? (
                        paginatedMatiere.map((mt) => (
                            <TableRow key={mt.id}>
                                <TableCell className="font-medium">{mt.annees_scolaire?.annee_scolaire}</TableCell>
                                <TableCell className="font-medium">{mt.module}</TableCell>
                                <TableCell className="font-medium">{mt.jour}</TableCell>
                                <TableCell className="font-medium">{mt.classes.niveau}</TableCell>
                                <TableCell className="font-medium">{mt.departement.name}</TableCell>
                                <TableCell className="font-medium">{mt.matiere.nom}</TableCell>
                                <TableCell className="font-medium">{mt.salle.salle}-({mt.salle.capacite})</TableCell>
                                <TableCell>{mt.heure_debut.slice(0, 5)} - {mt.heure_fin.slice(0, 5)}</TableCell>


                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {/* Pagination */}
            <div className="flex items-center justify-between gap-3 mt-4 max-sm:flex-col">
                <p
                    className="flex-1 whitespace-nowrap text-sm text-muted-foreground"
                    aria-live="polite"
                >
                    Page{" "}
                    <span className="text-foreground">{pagination.pageIndex + 1}</span> of{" "}
                    <span className="text-foreground">{totalPages}</span>
                </p>
                <div className="grow">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    onClick={() =>
                                        setPagination((prev) => ({
                                            ...prev,
                                            pageIndex: Math.max(prev.pageIndex - 1, 0),
                                        }))
                                    }
                                    disabled={pagination.pageIndex === 0}
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
                                const isActive = page === pagination.pageIndex + 1;
                                return (
                                    <PaginationItem key={page}>
                                        <Button
                                            size="icon"
                                            variant={isActive ? "outline" : "ghost"}
                                            onClick={() =>
                                                setPagination((prev) => ({ ...prev, pageIndex: page - 1 }))
                                            }
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
                                    onClick={() =>
                                        setPagination((prev) => ({
                                            ...prev,
                                            pageIndex: Math.min(prev.pageIndex + 1, totalPages - 1),
                                        }))
                                    }
                                    disabled={pagination.pageIndex === totalPages - 1}
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

export { SalleData };
