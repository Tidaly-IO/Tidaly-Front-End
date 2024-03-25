import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Avatar, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Alert, Snackbar } from '@mui/material';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const UserProfile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [passwordChangeAlertOpen, setPasswordChangeAlertOpen] = useState(false);
    const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);
    const [deleteAccountConfirmation, setDeleteAccountConfirmation] = useState("");
    const [picture, setPicture] = useState("https://www.w3schools.com/howto/img_avatar.png");

    const handleOpenDeleteAccountModal = () => {
        setOpenDeleteAccountModal(true);
    };

    const handleCloseDeleteAccountModal = () => {
        setOpenDeleteAccountModal(false);
        setDeleteAccountConfirmation("");
    };

    const handleDeleteAccount = async () => {
        if (deleteAccountConfirmation === "SUPPRIMER") {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                };

                await axios.delete('https://tidaly-api-backend.onrender.com/api/v1/user', config);

                //localStorage.removeItem("token");

                window.location.href = "/";

            } catch (error) {
                console.error("Erreur lors de la suppression du compte: ", error);
            }

        } else {
            alert("Veuillez entrer 'SUPPRIMER' pour confirmer la suppression de votre compte");
        }
    };

    const getUserInformations = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            };

            const response = await axios.get('https://tidaly-api-backend.onrender.com/api/v1/user/profile', config);

            setFirstName(response.data.firstname);
            setLastName(response.data.lastname);
            setAddress(response.data.address);
            setCity(response.data.city);
            setCountry(response.data.country_code);
            setPostalCode(response.data.postal_code);
            setPicture(response.data.picture);


        } catch (error) {
            console.error("Erreur lors de la récupération des informations: ", error);
        }
    };

    const handleUserInformations = async () => {
        const userData = {
            firstname: firstName,
            lastname: lastName,
            address: address,
            countryCode: country,
            city: city,
            postalCode: postalCode
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            };

            await axios.put('https://tidaly-api-backend.onrender.com/api/v1/user/profile', userData, config);

            setAlertOpen(true);

        } catch (error) {
            console.error("Erreur lors de la mise à jour des informations: ", error);
        }
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setPassword("");
        setVerifyPassword("");
    };

    const handleChangePassword = () => {
        if (password.length >= 8) {
            if (password === verifyPassword) {
                const userData = {
                    password: password
                }

                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                    };

                    axios.put('https://tidaly-api-backend.onrender.com/api/v1/user', userData, config);

                    setOpenModal(false);
                    setPasswordChangeAlertOpen(true);

                } catch (error) {
                    console.error("Erreur lors de la mise à jour du mot de passe: ", error);
                }
            } else {
                alert("Les mots de passe ne correspondent pas")
            }
        }
        else {
            alert("Le mot de passe doit contenir au moins 8 caractères")
        }
    };

    const handleProfilePictureChange = async (event) => {
        const file = event.target.files[0];
        const fileSize = file.size; // Taille en octets
        const maxSize = 2 * 1024 * 1024; // 2 Mo en octets

        if (fileSize > maxSize) {
            alert("La taille de la photo ne doit pas dépasser 2 Mo");
            event.target.value = '';
            return;
        }

        const formData = new FormData();
        formData.append('picture', file);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            };

            const response = await axios.post('https://tidaly-api-backend.onrender.com/api/v1/user/profile/picture', formData, config);

            if (response.status === 201) {
                alert("L'image de profil a été mise à jour avec succès");
                // Actualisez l'image de profil si nécessaire
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'image de profil: ", error);
        }
    };


    useEffect(() => {
        getUserInformations();
    }, []);

    return (
        <Box m="20px">
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
                <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Vos informations ont bien été mises à jour
                </Alert>
            </Snackbar>

            <Snackbar open={passwordChangeAlertOpen} autoHideDuration={6000} onClose={() => setPasswordChangeAlertOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={() => setPasswordChangeAlertOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Votre mot de passe a été changé avec succès
                </Alert>
            </Snackbar>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="PROFIL UTILISATEUR" subtitle="Bienvenue sur votre profil" />
            </Box>
            <Box
                backgroundColor={colors.primary[400]}
                width="calc(100% - 40px)"
                height="calc(65vh)"
                mt="20px"
                mx="20px"
                borderRadius="10px"
                p="20px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="space-around"
            >
                <Avatar alt="User Avatar" src={picture} sx={{ width: 150, height: 150 }} />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField label="Prénom" fullWidth value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Nom" fullWidth value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Adresse" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Ville" fullWidth value={city} onChange={(e) => setCity(e.target.value)} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Code Postal" fullWidth value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Pays" fullWidth value={country} onChange={(e) => setCountry(e.target.value)} />
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button variant="contained" onClick={handleOpenModal} style={{ backgroundColor: colors.tidaly[100], color: '#fff'}}>Changer le mot de passe</Button>
                    <label htmlFor="profile-picture-input">
                        <Button
                            variant="contained"
                            component="span"
                            style={{ backgroundColor: colors.tidaly[100], color: '#fff'}}
                            sx={{ ml: 2 }}
                            startIcon={<CloudUploadIcon />}
                        >
                            Changer la photo de profil
                        </Button>
                        <VisuallyHiddenInput
                            id="profile-picture-input"
                            type="file"
                            onChange={handleProfilePictureChange}
                        />
                    </label>
                    <Button color="error" variant="contained" sx={{ ml: 2 }} onClick={handleOpenDeleteAccountModal}>Supprimer son compte</Button>
                </Box>
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" onClick={handleUserInformations} style={{ backgroundColor: colors.tidaly[100], color: '#fff', marginTop: "20px"}}>Enregistrer</Button>
            </Box>

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Changer le mot de passe</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Nouveau mot de passe"
                        type="password"
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="newPassword"
                        label="Confirmer le nouveau mot de passe"
                        type="password"
                        required
                        fullWidth
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleChangePassword} color="primary">
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteAccountModal} onClose={handleCloseDeleteAccountModal}>
                <DialogTitle>Supprimer son compte</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="deleteAccountReason"
                        label="Raison de la suppression du compte"
                        type="text"
                        required
                        fullWidth
                        multiline // Cette prop permet de rendre le TextField multi-lignes
                        rows={4} // Vous pouvez ajuster le nombre de lignes selon vos besoins
                        inputProps={{ maxLength: 250 }} // Limite à 250 caractères
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="deleteAccountConfirmation"
                        label="Entrez 'SUPPRIMER' pour confirmer la suppression de votre compte"
                        type="text"
                        fullWidth
                        required
                        value={deleteAccountConfirmation}
                        onChange={(e) => setDeleteAccountConfirmation(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteAccountModal} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleDeleteAccount} color="error">
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserProfile;
