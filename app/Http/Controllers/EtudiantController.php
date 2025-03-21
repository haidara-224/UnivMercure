<?php
namespace App\Http\Controllers;

use App\Http\Requests\studentFormAddRequest;
use App\Models\anneesScolaire;
use App\Models\classes;
use App\Models\departement;
use App\Models\etudiant;
use App\Models\parcour;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PhpParser\Node\Expr\Throw_;
use Illuminate\Support\Facades\Storage;

class EtudiantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $derniereAnneeScolaire = anneesScolaire::orderByDesc('annee_scolaire')->first();

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
        $niveau=classes::select(['id','niveau'])->get();
        $annesscolaire=anneesScolaire::select(['id','annee_scolaire'])->orderByDesc('annee_scolaire')->get();
        $departement=departement::select(['id','name'])->get();
        return Inertia::render('dashboard/etudiants/new',[
            'niveau'=>$niveau,
            'annees'=>$annesscolaire,
            'departement'=>$departement
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(studentFormAddRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('images/etudiant', 'public');
            $data['photo'] = $photoPath;
        }

        try {
            DB::beginTransaction();

            $create_student = etudiant::create([
                'matricule' => $data['matricule'],
                'name' => $data['nom'],
                'prenom' => $data['prenom'],
                'sexe' => $data['genre'],
                'telephone' => $data['telephone'],
                'photo' => $data['photo'] ?? null,
            ]);

            parcour::create([
                'etudiant_id' => $create_student->id,
                'annees_scolaire_id' => $data['annees_scolaire'],
                'classes_id' => $data['niveau'],
                'departement_id' => $data['departement']
            ]);

            DB::commit();

            return redirect()->back()->with("success", "Étudiant ajouté avec succès");
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()->with("error", "Erreur lors de l'ajout de l'étudiant : " . $e->getMessage());
        }
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
