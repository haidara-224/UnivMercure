<?php
namespace App\Http\Controllers;
use App\Models\anneesScolaire;
use App\Models\etudiant;
use App\Models\parcour;
use Illuminate\Http\Request;
use Inertia\Inertia;
class EtudiantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $derniereAnneeScolaire = anneesScolaire::latest()->first();

        // Vérifier si aucune année scolaire n'existe
        if (!$derniereAnneeScolaire) {
            return Inertia::render('dashboard/etudiants/index', [
                'groupedEtudiants' => []
            ]);
        }

        $parcours = Parcour::with(['classes', 'departement', 'etudiant'])
            ->where('annees_scolaire_id', $derniereAnneeScolaire->id)
            ->get();



        return Inertia::render('dashboard/etudiants/index', [
            'groupedEtudiants' => $parcours
        ]);
    }




    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/etudiants/new');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(etudiant $etudiant)
    {



    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(etudiant $etudiant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, etudiant $etudiant)
    {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(etudiant $etudiant)
    {
        //
    }
}
