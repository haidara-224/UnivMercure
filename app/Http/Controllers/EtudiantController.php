<?php
namespace App\Http\Controllers;

use App\Http\Requests\studentFormAddRequest;
use App\Http\Requests\studentFormUpdateRequest;
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


        if (!$derniereAnneeScolaire) {
            return Inertia::render('dashboard/etudiants/index', [
                'groupedEtudiants' => []
            ]);
        }

        $parcours = Parcour::select(
            'parcours.*',
            'classes.niveau',
            'departements.name as departement_name',
             'etudiants.matricule as etudiant_matricule',
             'etudiants.name as etudiant_name',
             'etudiants.prenom as etudiant_prenom',
             'etudiants.sexe as etudiant_sexe',
             'etudiants.photo as etudiant_photo',
             )
            ->join('classes', 'parcours.classes_id', '=', 'classes.id')
            ->join('departements', 'parcours.departement_id', '=', 'departements.id')
            ->join('etudiants', 'parcours.etudiant_id', '=', 'etudiants.id')
            ->where('parcours.annees_scolaire_id', $derniereAnneeScolaire->id)
            ->orderByDesc('classes.niveau')
            ->orderByDesc('departements.name')
            ->orderByDesc('etudiants.name')
            ->get();
        //dd($parcours);
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
    public function edit(parcour $parcours)
    {
        $niveau=classes::select(['id','niveau'])->get();
        $annesscolaire=anneesScolaire::select(['id','annee_scolaire'])->orderByDesc('annee_scolaire')->get();
        $departement=departement::select(['id','name'])->get();
        $parcour = Parcour::with(['classes', 'anneesScolaire', 'departement', 'etudiant'])->findOrFail($parcours->id);

        return Inertia::render('dashboard/etudiants/edit',[
            'parcours'=>$parcour,
            'classe'=>$parcours->classes,
            'nv'=>$niveau,
            'annees'=>$annesscolaire,
            'dpt'=>$departement,

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(studentFormUpdateRequest $request, parcour $parcours)
    {
        $data = $request->validated();

        if ($request->hasFile('photo')) {
            // Supprimer l'ancienne photo si elle existe
            if ($parcours->etudiant->photo) {
                Storage::disk('public')->delete($parcours->etudiant->photo);
            }

            // Stocker la nouvelle photo
            $photoPath = $request->file('photo')->store('images/etudiant', 'public');
            $data['photo'] = $photoPath;
        }

        try {
            DB::beginTransaction();

            $parcours->etudiant->update([
                'matricule' => $data['matricule'],
                'name' => $data['nom'],
                'prenom' => $data['prenom'],
                'sexe' => $data['genre'],
                'telephone' => $data['telephone'],
                'photo' => $data['photo'] ?? $parcours->etudiant->photo,
            ]);

            $parcours->update([
                'annees_scolaire_id' => $data['annees_scolaire'],
                'classes_id' => $data['niveaux'],
                'departement_id' => $data['departement']
            ]);

            DB::commit();

            return redirect()->back()->with("success", "Étudiant mis à jour avec succès");
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()->with("error", "Erreur lors de la mise à jour de l'étudiant : " . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(parcour $parcours)
    {
        $parcours->delete();
        return redirect()->back()->with("success", "Étudiant mis Supprimer avec succès");
    }
}
