"use client";

import PrimaryButton from "@/components/PrimaryButton";
import React, { useState, useRef } from "react";
import axiosInstance from "@/services/axiosConfig";
import SweetAlert from "@/components/SweetAlert";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axiosInstance.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("File uploaded successfully:", response.data);
        setFile(null);
        setAlertMessage(response?.data?.message);
        setAlertType("success");
      } catch (error) {
        console.error("Error uploading file:", error);

        setAlertMessage(
          error?.response?.data?.message || "Error uploading file"
        );
        setAlertType("error");
      } finally {
        setLoading(false);
        setTimeout(() => {
          setAlertMessage(null);
          setAlertType(null);
        }, 3000);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="h-screen w-full grid place-items-start justify-center items-center">
      <div className="pt-14 w-[350px]">
        {alertMessage && <SweetAlert message={alertMessage} type={alertType} />}
        <div className="bg-white h-[350px] w-[350px] shadow-lg rounded-md p-4">
          <button
            type="button"
            onClick={triggerFileInput}
            className="block w-full text-sm text-gray-900 border-dashed border-2 h-full rounded-lg cursor-pointer focus:outline-none p-2"
          >
            Sélectionner fichier xls, xlsx
          </button>
          <input
            type="file"
            id="fileInput"
            ref={fileInputRef}
            accept=".xls,.xlsx"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        {file && (
          <div className="mt-8">
            <div className="flex items-center justify-between bg-white shadow-md p-2 rounded-md">
              <span className="text-gray-700">{file.name}</span>
              <button
                type="button"
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={removeFile}
              >
                X
              </button>
            </div>
          </div>
        )}
        <div className="w-full mt-8">
          <PrimaryButton
            title={loading ? "Importation..." : "Importer"}
            onClicked={handleUpload}
            disabled={!file || loading}
            className={" w-full"}
          />
        </div>
      </div>
    </div>
  );
}
