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
import { Matiere } from "@/types";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { AddMatiere } from "./AddMatiere";

interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    matiere: Matiere[];
    departement: { id: number; name: string }[];
}

type SortColumn = keyof Matiere;

function Matieres() {
    const { matiere, departement } = usePage<CustomPageProps>().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState<SortColumn>("nom");
    const [sortDirection, setSortDirection] = useState("asc");
    const { delete: destroy } = useForm({});
    const pageSize = 7;

    // Pagination state (pageIndex starts at 0)
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize,
    });
 const handleDelete = (matiere: Matiere) => {
        const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer ${matiere.nom} ?`);
        if (confirmDelete) {
            destroy(route('dashboard.matiere.delete', matiere.id), {
                preserveScroll: true,
            });
        }
    };
    // Filtrage des données
    const filteredMatiere = useMemo(() => {
        return matiere.filter((m) =>
            m.nom.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [matiere, searchTerm]);

    // Tri des données filtrées
    const sortedMatiere = useMemo(() => {
        return [...filteredMatiere].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
            if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredMatiere, sortColumn, sortDirection]);

    // Calcul de la donnée paginée
    const paginatedMatiere = useMemo(() => {
        const start = pagination.pageIndex * pageSize;
        return sortedMatiere.slice(start, start + pageSize);
    }, [sortedMatiere, pagination, pageSize]);

    // Calcul du nombre total de pages
    const totalPages = Math.ceil(sortedMatiere.length / pageSize);

    const handleSort = (column: SortColumn) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
        // Remettre à la première page quand le tri change
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    };

    // On utilise le hook custom pour générer la liste des pages et ellipses
    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
        currentPage: pagination.pageIndex + 1,
        totalPages: totalPages,
        paginationItemsToDisplay: 5,
    });


    return (
        <div className="mx-auto my-6 w-full max-w-6xl rounded border p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                <div className="flex items-center gap-2">
                    <AddMatiere departements={departement} />
                    <Link href="">voir la Table des Matieres</Link>
                </div>
                <h1 className="text-xl font-bold">Matière</h1>
                <Input
                    placeholder="Search Matière..."
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
                            onClick={() => handleSort("nom")}
                        >
                            Matière{" "}
                            {sortColumn === "nom" && (
                                <span className="ml-1">
                                    {sortDirection === "asc" ? "\u2191" : "\u2193"}
                                </span>
                            )}
                        </TableHead>
                        <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort("departements")}
                        >
                            départements{" "}
                            {sortColumn === "departements" && (
                                <span className="ml-1">
                                    {sortDirection === "asc" ? "\u2191" : "\u2193"}
                                </span>
                            )}
                        </TableHead>

                        <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort("created_at")}
                        >
                            Created{" "}
                            {sortColumn === "created_at" && (
                                <span className="ml-1">
                                    {sortDirection === "asc" ? "\u2191" : "\u2193"}
                                </span>
                            )}
                        </TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedMatiere.length > 0 ? (
                        paginatedMatiere.map((mt) => (
                            <TableRow key={mt.id}>
                                <TableCell className="font-medium">{mt.nom}</TableCell>
                                <TableCell className="font-medium">
                                    {mt.departements?.length > 0 ? (
                                        mt.departements.map((dpt) => (
                                            <span key={dpt.id} className="block text-sm text-muted-foreground">
                                                {dpt.name}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-muted-foreground italic">Aucun département</span>
                                    )}
                                </TableCell>


                                <TableCell>
                                    {new Date(mt.created_at).toLocaleDateString("fr-FR", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </TableCell>
                                <TableCell className="flex gap-1">
                                    <Button variant="ghost" size="icon">
                                        <Pencil className="size-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => {handleDelete(mt)}}>
                                        <Trash2 className="size-4" />
                                    </Button>
                                </TableCell>
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

export { Matieres };
