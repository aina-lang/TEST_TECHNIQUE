import { router, useForm } from "@inertiajs/react";
import {
    Box,
    CircularProgress,
    FormLabel,
    Modal,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";

function EditCongeModel({ conge, open, onClose }) {
    console.log("====================================");
    console.log(conge);
    console.log("====================================");
    const { data, setData, post, put, reset, processing, errors } = useForm({
        date_debut: conge?.date_debut || "",
        date_fin: conge?.date_fin || "",
        raison: conge?.raison || "",
        // id: conge?.id || "",
    });

    const handleClose = () => {
        onClose();
        reset();
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleEditConge = () => {
        put(route("leave.update", conge), {
            onSuccess: () => handleClose(),
            onError: () => {
                console.log("Erreur lors de la mise à jour de l'employé.");
            },
        });
    };

    useEffect(() => {
        setData({
            date_debut: conge?.date_debut || "",
            date_fin: conge?.date_fin || "",
            raison: conge?.raison || "",
        });
    }, [conge]);

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
                <div className="mt-4">
                    {" "}
                    <FormLabel>Date début</FormLabel>
                    <TextField
                        margin="normal"
                        title="Date début"
                        name="date_debut"
                        fullWidth
                        variant="outlined"
                        value={data.date_debut}
                        onChange={handleChange}
                        error={Boolean(errors.date_debut)}
                        helperText={errors.date_debut}
                        type="date"
                    />
                </div>
                <div className="mt-4">
                    {" "}
                    <FormLabel>Date début</FormLabel>
                    <TextField
                        margin="normal"
                        // label="Date fin"
                        title="Date fin"
                        name="date_fin"
                        fullWidth
                        variant="outlined"
                        value={data.date_fin}
                        onChange={handleChange}
                        error={Boolean(errors.date_fin)}
                        helperText={errors.date_fin}
                        type="date"
                    />
                </div>
                <TextField
                    margin="normal"
                    label="Raison"
                    name="raison"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    value={data.raison}
                    onChange={handleChange}
                    error={Boolean(errors.raison)}
                    helperText={errors.raison}
                />

                <div className="flex justify-end mt-4">
                    <PrimaryButton
                        disabled={processing}
                        onClick={handleEditConge}
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

export default EditCongeModel;
