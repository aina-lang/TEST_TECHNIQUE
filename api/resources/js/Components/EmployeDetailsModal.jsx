import React from "react";
import { Box, Modal, Typography } from "@mui/material";

const EmployeDetailsModal = ({ open, onClose, employee }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                className="bg-white rounded-lg shadow-lg p-8 "
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 600,
                    bgcolor: "background.paper",
                    borderRadius: "8px",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h4" component="h2" className="mb-4">
                    Détails de l'employé
                </Typography>
                <Typography className="mb-2">
                    <span className="font-semibold">Nom complets : </span>
                    {employee?.nom + " " + employee?.prenoms}
                </Typography>
                <Typography className="mb-2">
                    <span className="font-semibold">Email : </span>
                    {employee?.email}
                </Typography>
                <Typography className="mb-2">
                    <span className="font-semibold">Congés annuels : </span>
                    {employee?.nbr_conge_annuel}
                </Typography>
                <Typography className="mb-2">
                    <span className="font-semibold">Congés pris : </span>
                    {employee?.total_days_taken}
                </Typography>
                <Typography className="mb-2">
                    <span className="font-semibold">Numéro matricule : </span>
                    {employee?.num_matricule}
                </Typography>
                <Typography className="mb-2">
                    <span className="font-semibold">Poste : </span>
                    {employee?.poste}
                </Typography>
                <div className="flex justify-end mt-4">
                    {/* Boutons ou autres actions peuvent être ajoutés ici */}
                </div>
            </Box>
        </Modal>
    );
};

export default EmployeDetailsModal;
