import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const ConfirmationModal = ({
    open,
    onClose,
    onConfirm,
    title,
    message,
    confirmButtonText = "Oui",
    cancelButtonText = "Annuler",
    type,
}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    borderRadius: "8px",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" component="h2" className="mb-4">
                    {title}
                </Typography>
                <Typography className="mb-4">{message}</Typography>
                <div className="flex justify-end mt-4">
                    {type === "confirm" && (
                        <>
                            <PrimaryButton onClick={onConfirm} className="mr-2">
                                {confirmButtonText}
                            </PrimaryButton>
                            <SecondaryButton
                                severity="secondary"
                                onClick={onClose}
                            >
                                {cancelButtonText}
                            </SecondaryButton>
                        </>
                    )}
                    {type === "alert" && (
                        <PrimaryButton color="primary" onClick={onClose}>
                            Ok
                        </PrimaryButton>
                    )}
                </div>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;
