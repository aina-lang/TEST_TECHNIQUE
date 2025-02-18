import { router, useForm } from "@inertiajs/react";
import {
    Box,
    CircularProgress,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

function AddEmployeModal({ open, setOpen, onClose }) {
    const initialData = {
        nom: "",
        prenoms: "",
        email: "",
        poste: "",
    };

    const { data, setData, post, put, reset, processing, errors, setError } =
        useForm(initialData);

    const handleClose = () => {
        reset();
        onClose();
        setError({});
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleAddEmployee = () => {
        post(route("employees.store"), {
            onSuccess: () => handleClose(),
            onError: () => {
                console.log("Erreur lors de la mise à jour de l'employé.");
            },
        });
    };

    return (
        <Modal open={open} onClose={handleClose}>
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
                <Typography variant="h6" component="h2">
                    {"Mettre à jour l'employé"}
                </Typography>
                <TextField
                    margin="normal"
                    label="Nom"
                    name="nom"
                    fullWidth
                    variant="outlined"
                    value={data.nom}
                    onChange={handleChange}
                    error={Boolean(errors.nom)}
                    helperText={errors.nom}
                />
                <TextField
                    margin="normal"
                    label="Prénoms"
                    name="prenoms"
                    fullWidth
                    variant="outlined"
                    value={data.prenoms}
                    onChange={handleChange}
                    error={Boolean(errors.prenoms)}
                    helperText={errors.prenoms}
                />
                <TextField
                    margin="normal"
                    label="Email"
                    name="email"
                    fullWidth
                    variant="outlined"
                    value={data.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                />
                <TextField
                    margin="normal"
                    label="Poste"
                    name="poste"
                    fullWidth
                    variant="outlined"
                    value={data.poste}
                    onChange={handleChange}
                    error={Boolean(errors.poste)}
                    helperText={errors.poste}
                />
                <div className="flex justify-end mt-4">
                    <PrimaryButton
                        disabled={processing}
                        onClick={handleAddEmployee}
                    >
                        {processing ? (
                            <>
                                <CircularProgress color="primary" size={15} />
                                Enregistrement
                            </>
                        ) : (
                            "Enregistrer"
                        )}
                    </PrimaryButton>
                    <SecondaryButton
                        disabled={processing}
                        severity="secondary"
                        onClick={handleClose}
                        className="ml-2"
                    >
                        Annuler
                    </SecondaryButton>
                </div>
            </Box>
        </Modal>
    );
}

export default AddEmployeModal;
