"use client";
import { Client } from "@/lib/types";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/services/axiosConfig";
import PrimaryButton from "@/components/PrimaryButton";
import SweetAlert from "@/components/SweetAlert";

const ClientEdit = () => {
  const [client, setClient] = useState<any | Client>({
    nom: "",
    prenom: "",
    civilite: "",
    adresse: "",
    code_postal: "",
    ville: "",
    telephone_domicile: "",
    telephone_portable: "",
    email: "",
    date_mise_circu: "",
    date_achat: "",
    marque: "",
    modele: "",
    version: "",
    vin: "",
    immatriculation: "",
    type_prospect: "",
    kilometrage: "",
    energie: "",
    vendeur_vn: "",
    vendeur_vo: "",
    commentaire: "",
    proprietaire: "",
    type_vn_vo: "",
    numero_dossier_vn: "",
    date_evenement: "",
    origine_evenement: "",
    intermediaire_de_vente: "",
  });

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { id } = useParams();

  const fetchClient = async () => {
    try {
      const response = await axiosInstance.get(`clients/${id}`);
      setClient(response.data);
    } catch (err) {
      setAlertMessage("Client non trouvé");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchClient();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.put(`clients/${id}`, client);
      setAlertMessage("Client modifié avec succès.");
      setAlertType("success");
      setLoading(false);

      router.push(`/client/${id}`);
    } catch (err) {
      setLoading(false);
      setAlertMessage("Erreur de modification .");
      setAlertType("error");
    }
  };

  return (
    <div className="p-14">
      <h1 className="text-2xl  my-10">Modifier le client {client.nom}</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {" "}
          {Object.entries(client).map(([key, value]) =>
            key != "id" && key != "created_at" && key != "updated_at" ? (
              <div className="" key={key}>
                <label
                  htmlFor={key}
                  className="text-sm mb-2 block first-letter:uppercase"
                >
                  {key}
                </label>
                <input
                  type="text"
                  name={key}
                  value={value?.toString() || ""}
                  onChange={handleChange}
                  placeholder={key}
                  className="border p-2 rounded-md"
                />
              </div>
            ) : (
              ""
            )
          )}
        </div>
        {alertMessage && <SweetAlert message={alertMessage} type={alertType} />}

        <div className="mt-4">
          <PrimaryButton
            type="submit"
            className=" text-white p-2 rounded-md"
            title={loading ? "mise à jours" : "Mettre à jour"}
          />
        </div>
      </form>
    </div>
  );
};

export default ClientEdit;
