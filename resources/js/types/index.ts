import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
export interface professeur{
    id:number;
    matricule:string;
    name:string;
    prenom:string;
    telephone:string;
    photo?:string | null;
    user_id?:number | null;
    created_at:Date;
    updated_at:Date;

}
export interface faculty{
id:number;
name:string;
created_at:Date;
updated_at:Date;
}
export interface Departement{
    id:number;
    name:string;
    professeur_id:number;
    professeur:professeur;
    faculty_id:number;
    faculty:faculty;
    created_at:Date;
    updated_at:Date;
}
export interface Niveaux{
    id:number;
    niveau:string;
    departement_id:number;
    departement:Departement;
    created_at:Date;
    updated_at:Date;
}
