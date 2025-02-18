
import { Box, Modal, Typography } from "@mui/material";
import React from "react";

function CongeDetailsModal({ open, onClose, conge }) {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                className="bg-white rounded-lg shadow-lg p-8"
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
                    Détails du congé
                </Typography>
                <Typography className="mb-2">
                    <span className="font-semibold">Nom complet : </span>
                    {conge?.employee?.nom + " " + conge?.employee?.prenoms}
                </Typography>
                <Typography className="mb-2">
                    <span className="font-semibold">Poste : </span>
                    {conge?.employee?.poste}
                </Typography>
                <Typography className="mb-2">
                    <span className="font-semibold">Date de début : </span>
                    {conge?.date_debut}
                </Typography>
                <Typography className="mb-2">
                    <span className="font-semibold">Date de fin : </span>
                    {conge?.date_fin}
                </Typography>
                <Typography className="mb-2">
                    <span className="font-semibold">Raison : </span>
                    {conge?.raison}
                </Typography>
                <Typography className="mb-2">
                    <span className="font-semibold">Statut : </span>
                    {conge?.status}
                </Typography>
                {/* <Typography className="mb-2">
                    <span className="font-semibold">Nombre total de jours pris : </span>
                    {conge?.total_days_taken}
                </Typography> */}
            </Box>
        </Modal>
    );
}

export default CongeDetailsModal;
