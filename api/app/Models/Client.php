<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    protected $table = 'clients';

    protected $fillable = [
        'compte_affaire',
        'compte_evenement',
        'numero_de_fiche',
        'civilite',
        'nom',
        'prenom',
        'numero_nom_voie',
        'adresse',
        'code_postal',
        'ville',
        'telephone_job',
        'telephone_domicile',
        'telephone_portable',
        'email',
        'date_mise_circu',
        'date_achat',
        'compte_dernier_evenement',
        'marque',
        'modele',
        'version',
        'vin',
        'immatriculation',
        'type_prospect',
        'kilometrage',
        'energie',
        'vendeur_vn',
        'vendeur_vo',
        'commentaire',
        'proprietaire',
        'type_vn_vo',
        'numero_dossier_vn',
        'date_evenement',
        'origine_evenement',
        'intermediaire_de_vente',
    ];
}
