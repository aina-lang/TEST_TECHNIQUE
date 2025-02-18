export interface ButtonProps {
  title?: string;
  onClicked?: CallableFunction;
  className?: string;
  disabled?: boolean;
  type?: string;
}

export interface Client {
  id: number;
  compte_affaire: string;
  compte_evenement: string;
  numero_de_fiche: string;
  civilite: string;
  nom: string;
  prenom: string;
  numero_nom_voie: string;
  adresse: string;
  code_postal: string;
  ville: string;
  telephone_job: string;
  telephone_domicile: string;
  telephone_portable: string;
  email: string;
  date_mise_circu: string;
  date_achat: string;
  compte_dernier_evenement: string;
  marque: string;
  modele: string;
  version: string;
  vin: string;
  immatriculation: string;
  type_prospect: string;
  kilometrage: string;
  energie: string;
  vendeur_vn: string;
  vendeur_vo: string;
  commentaire: string;
  proprietaire: string;
  type_vn_vo: string;
  numero_dossier_vn: string;
  date_evenement: string;
  origine_evenement: string;
  intermediaire_de_vente: string;
  data: [];
}
