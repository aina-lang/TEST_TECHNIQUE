import { router, useForm } from "@inertiajs/react";
import {
    Box,
    CircularProgress,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";

function EditEmployeModal({ employee, open, setOpen, onClose }) {
    const { data, setData, post, put, reset, processing, errors } = useForm({
        nom: employee?.nom || "",
        prenoms: employee?.prenoms || "",
        email: employee?.email || "",
        poste: employee?.poste || "",
    });

    const handleClose = () => {
        onClose();
        reset();
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleEditEmployee = () => {
        put(route("employees.update", employee.id), {
            onSuccess: () => handleClose(),
            onError: () => {
                console.log("Erreur lors de la mise à jour de l'employé.");
            },
        });
    };

    useEffect(() => {
        setData({
            nom: employee?.nom,
            prenoms: employee?.prenoms,
            email: employee?.email,
            poste: employee?.poste,
        });
    }, [employee]);

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
                        onClick={handleEditEmployee}
                    >
                        {processing ? (
                            <>
                                <CircularProgress color="primary" size={15} />
                                Enregistrement
                            </>
                        ) : (
                            "Mettre à jour"
                        )}
                    </PrimaryButton>
                    <SecondaryButton
                        disabled={processing}
                        severity="secondary"
                        onClick={onClose}
                        className="ml-2"
                    >
                        Annuler
                    </SecondaryButton>
                </div>
            </Box>
        </Modal>
    );
}

export default EditEmployeModal;
