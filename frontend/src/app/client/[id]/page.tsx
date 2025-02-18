"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/services/axiosConfig";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import SweetAlert from "@/components/SweetAlert";

const ClientView = () => {
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const fetchClient = async () => {
    try {
      const response = await axiosInstance.get(`/clients/${id}`);
      setClient(response.data);
      setAlertType("success");
    } catch (error) {
      setAlertType("error");
      console.error("Erreur lors de la récupération du client", error);
    } finally {
      setLoading(false);
      setAlertType("success");
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    fetchClient();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      try {
        await axiosInstance.delete(`/clients/${id}`);
        setAlertMessage("Client supprimé avec succès.");
        setAlertType("success");
        router.push("/");
      } catch (error) {
        setAlertMessage("Erreur lors de la suppression.");
        setAlertType("error");
        console.error("Erreur lors de la suppression du client", error);
      } finally {
        setLoading(false);
        setAlertType("success");
      }
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="  w-full p-14">
      <h1 className="text-2xl  my-10">Détails du client {client?.nom}</h1>
      <div className="grid grid-cols-4 gap-4">
        <p>
          <strong>Nom:</strong> {client?.nom}
        </p>
        <p>
          <strong>Prénom:</strong> {client?.prenom}
        </p>
        <p>
          <strong>Civilité:</strong> {client?.civilite}
        </p>
        <p>
          <strong>Adresse:</strong> {client?.adresse}
        </p>
        <p>
          <strong>Code Postal:</strong> {client?.code_postal}
        </p>
        <p>
          <strong>Ville:</strong> {client?.ville}
        </p>
        <p>
          <strong>Numéro de téléphone (domicile):</strong>{" "}
          {client?.telephone_domicile}
        </p>
        <p>
          <strong>Numéro de téléphone (portable):</strong>{" "}
          {client?.telephone_portable}
        </p>
        <p>
          <strong>Email:</strong> {client?.email}
        </p>
        <p>
          <strong>Date de mise en circulation:</strong>{" "}
          {client?.date_mise_circu}
        </p>
        <p>
          <strong>Date d'achat:</strong> {client?.date_achat}
        </p>
        <p>
          <strong>Marque:</strong> {client?.marque}
        </p>
        <p>
          <strong>Modèle:</strong> {client?.modele}
        </p>
        <p>
          <strong>Version:</strong> {client?.version}
        </p>
        <p>
          <strong>VIN:</strong> {client?.vin}
        </p>
        <p>
          <strong>Immatriculation:</strong> {client?.immatriculation}
        </p>
        <p>
          <strong>Type de prospect:</strong> {client?.type_prospect}
        </p>
        <p>
          <strong>Kilométrage:</strong> {client?.kilometrage}
        </p>
        <p>
          <strong>Energie:</strong> {client?.energie}
        </p>
        <p>
          <strong>Vendeur VN:</strong> {client?.vendeur_vn}
        </p>
        <p>
          <strong>Vendeur VO:</strong> {client?.vendeur_vo}
        </p>
        <p>
          <strong>Commentaire:</strong> {client?.commentaire}
        </p>
        <p>
          <strong>Propriétaire:</strong> {client?.proprietaire}
        </p>
        <p>
          <strong>Type VN/VO:</strong> {client?.type_vn_vo}
        </p>
        <p>
          <strong>Numéro de dossier VN:</strong> {client?.numero_dossier_vn}
        </p>
        <p>
          <strong>Date de l'événement:</strong> {client?.date_evenement}
        </p>
        <p>
          <strong>Origine de l'événement:</strong> {client?.origine_evenement}
        </p>
        <p>
          <strong>Intermédiaire de vente:</strong>{" "}
          {client?.intermediaire_de_vente}
        </p>
      </div>
      {alertMessage && <SweetAlert message={alertMessage} type={alertType} />}

      <div className="mt-8 space-x-4">
        <PrimaryButton
          onClicked={() => router.push(`/client/edit/${id}`)}
          title="Modifier"
        />
        <SecondaryButton onClicked={handleDelete} title="Supprimer" />
      </div>
    </div>
  );
};

export default ClientView;
