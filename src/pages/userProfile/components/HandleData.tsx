import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export const UserProfileLogic = () => {
  const [profilePhoto, setProfilePhoto] = useState<string>("https://www.w3schools.com/howto/img_avatar.png");
  const [isDefaultPhotoLoaded, setIsDefaultPhotoLoaded] = useState<boolean>(false);
  const [prenom, setPrenom] = useState<string>("");
  const [nom, setNom] = useState<string>("");
  const [adresse, setAdresse] = useState<string>("");
  const [ville, setVille] = useState<string>("");
  const [codePostale, setCodePostale] = useState<string>("");
  const [pays, setPays] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [emailModalOpen, setEmailModalOpen] = useState<boolean>(false);

  const saveButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const instance = axios.create({
        baseURL: 'http://20.111.43.70:3333/api/v1',
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
      });

      try {
        const response = await instance.get("/user/profile");
        const data = response.data;
        setPrenom(data.firstname);
        setNom(data.lastname);
        setAdresse(data.address);
        setVille(data.city);
        setPays(data.country_code);
        setCodePostale(data.postal_code);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations :", error);
      }
    };

    fetchData();
  }, []);

  const handleEditPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setProfilePhoto(e.target.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDefaultPhotoLoad = () => {
    setIsDefaultPhotoLoaded(true);
  };

  const handleSave = async () => {
    if (
      prenom.length < 2 ||
      nom.length < 2 ||
      adresse.length < 9 ||
      ville.length < 3 ||
      pays.length < 2 ||
      codePostale.length < 5
    ) {
      let message = "Veuillez remplir les champs suivants :";
      if (prenom.length < 2) {
        message += "\n- Prénom (minimum 2 caractères)";
      }
      if (nom.length < 2) {
        message += "\n- Nom (minimum 2 caractères)";
      }
      if (adresse.length < 9) {
        message += "\n- Adresse (minimum 9 caractères)";
      }
      if (ville.length < 3) {
        message += "\n- Ville (minimum 3 caractères)";
      }
      if (pays.length < 2) {
        message += "\n- Code Pays (minimum 2 caractères)";
      }
      if (codePostale.length < 5) {
        message += "\n- Code Postal (minimum 5 caractères)";
      }
      alert(message);

      if (saveButtonRef.current) {
        saveButtonRef.current.disabled = false;
      }
      return;
    }

    const userData = {
      firstname: prenom,
      lastname: nom,
      address: adresse,
      city: ville,
      countryCode: pays,
      postalCode: codePostale,
    };

    try {
      const instance = axios.create({
        baseURL: 'http://20.111.43.70:3333/api/v1',
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
      });

      const response = await instance.put("/user/profile", userData);
      console.log("Enregistrement réussi :", response.data);
      // Réactive le bouton après l'enregistrement
      if (saveButtonRef.current) {
        saveButtonRef.current.disabled = false;
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      // Réactive le bouton en cas d'erreur
      if (saveButtonRef.current) {
        saveButtonRef.current.disabled = false;
      }
    }
  };

  const handlePasswordChange = async () => {
    console.log("Ancien mot de passe :", oldPassword);
    console.log("Nouveau mot de passe :", newPassword);
    if (oldPassword.length < 8 || newPassword.length < 8) {
      alert("Le nouveau mot de passe doit comporter au moins 8 caractères");
    } else {
      if (oldPassword === newPassword) {
        try {
          const instance = axios.create({
            baseURL: 'http://20.111.43.70:3333/api/v1',
            headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
          });
          const response = await instance.put("/user", { password: newPassword });
          console.log("Changement de mot de passe réussi :", response.data);
        } catch (error) {
          console.error("Erreur lors du changement de mot de passe :", error);
        }
        setOldPassword("");
        setNewPassword("");
        setModalOpen(false);
      } else {
        alert("Les mots de passe ne sont pas identiques");
      }
    }
  };

  const handleEmailChange = async () => {
    console.log("Nouvelle adresse e-mail :", newEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      alert("L'adresse e-mail n'est pas valide");
    } else {
      setNewEmail("");
      setEmailModalOpen(false);
    }
  };

  const handleEmailCancel = () => {
    setNewEmail("");
    setEmailModalOpen(false);
  };

  const handleCancel = () => {
    setOldPassword("");
    setNewPassword("");
    setModalOpen(false);
  };

  return {
    profilePhoto,
    isDefaultPhotoLoaded,
    prenom,
    nom,
    adresse,
    ville,
    codePostale,
    pays,
    modalOpen,
    oldPassword,
    newPassword,
    newEmail,
    emailModalOpen,
    saveButtonRef,
    handleEditPhoto,
    handleDefaultPhotoLoad,
    handleSave,
    handlePasswordChange,
    handleEmailChange,
    handleEmailCancel,
    handleCancel,
    setModalOpen,
    setNewPassword,
    setOldPassword,
    setNewEmail,
    setEmailModalOpen,
    setPrenom,
    setNom,
    setAdresse,
    setVille,
    setCodePostale,
    setPays,
  };
};
