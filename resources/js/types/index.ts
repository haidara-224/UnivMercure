import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}
export interface Roles{
    id:string,
    name:string
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
    authUsers?:{
        id:string,
        name:string
    }[]
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    role:Roles[]
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
    user:User
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
    created_at:Date;
    updated_at:Date;
}
export interface AnnessScolaire{
    id:number;
    annee_scolaire:string;
    date_debut:Date;
    date_fin:Date;
    created_at:Date;
    updated_at:Date;
}
export interface Etudiants{
    id:string;
    matricule:string;
    name:string;
    prenom:string;
    telephone:string;
    photo ?:string | null;
    sexe:string;
    user?:User | null;
}
export interface Parcours{
    id:string;
    classes:Niveaux;
    departement_id:string;

    departement:Departement;
    etudiant:Etudiants;
    annees_scolaire:AnnessScolaire;
    classes_id:string;
    etudiant_id:string;
    annees_scolaire_id:string;
    created_at:Date;
    updated_at:Date;
}
export interface Salle{
    id:number;
    salle:string;
    capacite:number;
    created_at:Date;
    updated_at:Date;
}

export interface Note{
    id:number;
    note:string;
    etudiant:Etudiants;
    emploie_temps:EmploieTemps;
    created_at:Date;
    updated_at:Date;
}
export interface Matiere{
    id:number;
    nom:string;
    credits:number;
    departements:Departement[];
    created_at:Date;
    updated_at:Date;
}
export interface EmploieTemps{
    id:number;
    jour:string;
    heure_debut:Date;
    module:string;
    heure_fin:Date;
    salle:Salle;
    departement:Departement;
    Professeur:professeur;
    classes:Niveaux;
    annees_scolaire:AnnessScolaire;
    annees_scolaire_id:number;
    departement_id:number;
    professeur_id:number;
    classe_id:number;
    salle_id:number;
    matiere_id:number;
    classes_id:number;

    matiere:Matiere;
    created_at:Date;
    updated_at:Date;
}
export interface Notes {
    note1:number;
    note2:number;
    note3:number;
    moyenne:null;
    moyenne_literaire:null


}
export interface Tutos{
    id:number,
    titre:string,
    contenue:string,
    fichier?:string | null,
    video?:string | null,
    departement_id?:number | null,
    professeur_id?:number | null,
    classes_id?:number | null,
    departement?:Departement | null
    classes?:Niveaux | null
    professeur?:professeur | null
    created_at:Date;
    updated_at:Date;
}
export interface ExamensByClasse{
    id:number,
    titre:string,
    sujet_explication:string,
    fichier?:string | null,
    annees_scolaire_id:number;
    annees_scolaire:AnnessScolaire;
    departement_id?:number ,
    professeur_id?:number,
    classes_id?:number,
    departement?:Departement
    classes?:Niveaux
    professeur?:professeur
    date_debut:Date,
    date_fin:Date,

}
export interface ExamensByEtudiant{
    id:number,
    titre:string,
    sujet_explication:string,
    fichier?:string | null,
    annees_scolaire_id:number;
    annees_scolaire:AnnessScolaire;
    departement_id?:number ,
    professeur_id?:number,
   etudiant_id:number,
   etudiants:Etudiants[],
    professeur?:professeur
    date_debut:Date,
    date_fin:Date,

}



