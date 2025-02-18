"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosConfig";
import { Client } from "@/lib/types";
import { useRouter } from "next/navigation";

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const router = useRouter();

  const fetchClients = async (page: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/clients?page=${page}`);
      setClients(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 min-h-screen grid items-center">
      <div className="pt-24 md:pt-0">
        <h1 className="text-2xl mt-20 font-bold mb-4 text-gray-800">
          Les clients enregistrés
        </h1>
        {loading ? (
          <div className="text-center">Chargement...</div>
        ) : (
          <div>
            <div className="space-y-2 md:grid grid-cols-3 gap-4 items-center">
              {clients.map((client, i) => (
                <button
                  onClick={() => router.push(`client/${client.id}`)}
                  key={client.id}
                  className="bg-white shadow-md rounded-lg p-4 h-28 w-96 items-start flex justify-between "
                >
                  <div className="flex justify-between items-center text-sm w-full">
                    <span className="text-blue-500 ">{client.nom}</span>
                    <span className="text-gray-500 ml-4">
                      {new Date(client.date_evenement).toLocaleDateString()}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Pagination */}
            <div className="w-full py-4 flex justify-center items-center">
              <button
                className="p-4"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Précédent
              </button>
              <span className="mx-4">
                Page {currentPage} / {totalPages}
              </span>
              <button
                className="p-4"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientList;
