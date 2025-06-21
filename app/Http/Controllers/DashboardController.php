<?php

namespace App\Http\Controllers;

use App\Models\AnneesScolaire;
use App\Models\Classes;
use App\Models\Departement;
use App\Models\Etudiant;
use App\Models\Professeur;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class DashboardController extends Controller
{

    private function nombreProfesseur()
    {
        $professeur = Professeur::count();
        return $professeur;
    }
    private function nombreDepartement()
    {
        $departement = Departement::count();
        return $departement;
    }
    private function nombreNiveau()
    {
        $classes = Classes::count();
        return $classes;
    }

    public function index()
    {
        $derniereAnneeScolaire = AnneesScolaire::where('isActive',true)->first();

        // Vérifier si aucune année scolaire n'existe
        if (!$derniereAnneeScolaire) {
            return Inertia::render('dashboard', [
                'etudiantsCount'           => 0,
                'maleCount'                => 0,
                'femaleCount'              => 0,
                'professeursCount'         => $this->nombreProfesseur(),
                'DepartementCount'         => $this->nombreDepartement(),
                'niveauCount'              => $this->nombreNiveau(),
                'etudiantsParDepartement'  => [],
                'departements'             => Departement::with(['professeur', 'faculty'])->get(),
                'last_annees_scolaire'     => null
            ]);
        }

        $nbEtudiant = Etudiant::whereHas('parcours', function ($query) use ($derniereAnneeScolaire) {
            $query->where('annees_scolaire_id', $derniereAnneeScolaire->id);
        })->count();

        $maleCount = Etudiant::where('sexe', 'masculin')
            ->whereHas('parcours', function ($query) use ($derniereAnneeScolaire) {
                $query->where('annees_scolaire_id', $derniereAnneeScolaire->id);
            })
            ->count();

        $femaleCount = Etudiant::where('sexe', 'feminin')
            ->whereHas('parcours', function ($query) use ($derniereAnneeScolaire) {
                $query->where('annees_scolaire_id', $derniereAnneeScolaire->id);
            })
            ->count();

        $nbprofesseur = $this->nombreProfesseur();
        $nbdepartement = $this->nombreDepartement();
        $nbniveau = $this->nombreNiveau();

        $etudiantsParDepartement = Departement::withCount(['parcours' => function ($query) use ($derniereAnneeScolaire) {
            $query->where('annees_scolaire_id', $derniereAnneeScolaire->id);
        }])->get()->map(fn($dep) => [
            'id' => $dep->id,
            'name' => $dep->name,
            'nombre_etudiant' => $dep->parcours_count,
        ]);

        $departement = Departement::with(['professeur', 'faculty'])->get();

        return Inertia::render('dashboard', [
            'etudiantsCount'           => $nbEtudiant,
            'maleCount'                => $maleCount,
            'femaleCount'              => $femaleCount,
            'professeursCount'         => $nbprofesseur,
            'DepartementCount'         => $nbdepartement,
            'niveauCount'              => $nbniveau,
            'etudiantsParDepartement'  => $etudiantsParDepartement,
            'departements'             => $departement,
            'last_annees_scolaire'     => $derniereAnneeScolaire
        ]);
    }
    public function users()
    {
        $users = User::with(['etudiant', 'professeur', 'roles'])->orderByDesc('created_at')->get();
        $roles = Role::all();

        return Inertia::render('dashboard/users/index', [
            'users' => $users,
            'roles' => $roles
        ]);
    }
    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|',
        ]);

         User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return back()->with('success', 'Utilisateur créé avec succès.');
    }
   public function AddOrRevoqueRole(Request $request)
{
    $request->validate([
        'user_id' => 'required|exists:users,id',
        'role_id' => 'required|exists:roles,id',
        'action' => 'required|in:add,revoke',
    ]);

    $user = User::findOrFail($request->user_id);
    $role = Role::findOrFail($request->role_id);

    if ($request->action === 'add') {
        $user->assignRole($role);
    } elseif ($request->action === 'revoke') {
        $user->removeRole($role);
    }

    return back()->with('success', 'Rôle mis à jour avec succès.');
}

}
