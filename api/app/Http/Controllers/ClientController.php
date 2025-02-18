<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\Reader\Exception;
use App\Models\Client;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ClientController extends Controller
{
    public function upload(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'file' => 'required|mimes:csv,xlsx'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Format de fichier invalide.'], 400);
        }

        $file = $request->file('file');

        if (!$file || !$file->isValid()) {
            return response()->json(['error' => 'Fichier non valide ou corrompu.'], 400);
        }

        try {

            $spreadsheet = IOFactory::load($file->getPathname());

            $sheet = $spreadsheet->getActiveSheet();
            $rows = $sheet->toArray();  

            $clients = [];
            $isFirstRow = true;

            DB::beginTransaction();
            foreach ($rows as $row) {
                if ($isFirstRow) {
                    $isFirstRow = false;
                    continue;
                }
                Log::info($row);

                $clients[] = [
                    'compte_affaire' => $row[0],
                    'compte_evenement' => $row[1],
                    'compte_dernier_evenement' => $row[2],
                    'numero_de_fiche' => $row[4],
                    'civilite' => $row[5],
                    'nom' => $row[6],
                    'prenom' => $row[7],
                    'numero_nom_voie' => $row[8],
                    'adresse' => $row[9],
                    'code_postal' => $row[10],
                    'ville' => $row[11],
                    'telephone_job' => $row[12],
                    'telephone_domicile' => $row[13],
                    'telephone_portable' => $row[14],
                    'email' => $row[15],
                    'date_mise_circu' => $row[16],
                    'date_achat' => $row[17],
                    'marque' => $row[18],
                    'modele' => $row[19],
                    'version' => $row[20],
                    'vin' => $row[21],
                    'immatriculation' => $row[22],
                    'type_prospect' => $row[23],
                    'kilometrage' => $row[24],
                    'energie' => $row[25],
                    'vendeur_vn' => $row[26],
                    'vendeur_vo' => $row[27],
                    'commentaire' => $row[28],
                    'proprietaire' => $row[29],
                    'type_vn_vo' => $row[30],
                    'numero_dossier_vn' => $row[31],
                    'date_evenement' => $row[32],
                    'origine_evenement' => $row[33],
                    'intermediaire_de_vente' => $row[34],
                ];
            }

            if (!empty($clients)) {
                DB::table('clients')->insert($clients);
            }

            DB::commit();
            return response()->json(['message' => 'Importation réussie !'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Erreur lors de l\'importation : ' . $e->getMessage()], 500);
        }
    }




    public function index(Request $request)
    {
        try {
            $perPage = $request->get('perPage', 9);
            $clients = Client::paginate($perPage);

            return response()->json($clients);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des clients : ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la récupération des clients.'], 500);
        }
    }

    
    public function show($id)
    {
        try {
            $client = Client::findOrFail($id);
            return response()->json($client);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération du client avec ID ' . $id . ': ' . $e->getMessage());
            return response()->json(['error' => 'Client introuvable.'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $client = Client::findOrFail($id);
            $client->update($request->all());
            return response()->json(["message" => "Modification avec succées"]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la modification client : ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la modification client .'], 500);
        }
    }
    public function destroy($id)
    {
        try {
            $client = Client::findOrFail($id);
            $client->delete();
            return response()->json(['message' => 'Client supprimé !']);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la suppression du client avec ID ' . $id . ': ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la suppression du client.'], 500);
        }
    }
}
