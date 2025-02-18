<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('compte_affaire')->nullable();
            $table->string('compte_evenement')->nullable();
            $table->string('numero_de_fiche')->nullable();
            $table->string('civilite')->nullable();
            $table->string('nom')->nullable();
            $table->string('prenom')->nullable();
            $table->string('numero_nom_voie')->nullable();
            $table->string('adresse')->nullable();
            $table->string('code_postal')->nullable();
            $table->string('ville')->nullable();
            $table->string('telephone_job')->nullable();
            $table->string('telephone_domicile')->nullable();
            $table->string('telephone_portable')->nullable();
            $table->string('email')->nullable();
            $table->string('date_mise_circu')->nullable();
            $table->string('date_achat')->nullable();
            $table->string('compte_dernier_evenement')->nullable();
            $table->string('marque')->nullable();
            $table->string('modele')->nullable();
            $table->string('version')->nullable();
            $table->string('vin')->nullable();
            $table->string('immatriculation')->nullable();
            $table->string('type_prospect')->nullable();
            $table->string('kilometrage')->nullable();
            $table->string('energie')->nullable();
            $table->string('vendeur_vn')->nullable();
            $table->string('vendeur_vo')->nullable();
            $table->string('commentaire')->nullable();
            $table->string('proprietaire')->nullable();
            $table->string('type_vn_vo')->nullable();
            $table->string('numero_dossier_vn')->nullable();
            $table->string('date_evenement')->nullable();
            $table->string('origine_evenement')->nullable();
            $table->string('intermediaire_de_vente')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('clients');
    }
};
