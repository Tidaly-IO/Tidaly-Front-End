import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SideBar from '../components/SideBar';
import "../css/UserProfile.css";
import loupe from '../assets/loupe.png';
import ReactModal from 'react-modal';
import axios from "axios";

export const UserProfile = () => {
  const [profilePhoto, setProfilePhoto] = useState("https://www.w3schools.com/howto/img_avatar.png");
  const [isDefaultPhotoLoaded, setIsDefaultPhotoLoaded] = useState(false);
  const [sexe, setSexe] = useState("Homme");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [pays, setPays] = useState("");

  const saveButtonRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const instance = axios.create({
        baseURL: 'http://localhost:3333/api/v1',
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
      } catch (error) {
        console.error("Erreur lors de la récupération des informations :", error);
      }
    };

    fetchData();
  }, []);

  const handleEditPhoto = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setProfilePhoto(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleDefaultPhotoLoad = () => {
    setIsDefaultPhotoLoaded(true);
  };

  const handleSexeChange = (e) => {
    setSexe(e.target.value);
  };

  const handleSave = async () => {
    saveButtonRef.current.disabled = true;

    const userData = {
      firstname: prenom,
      lastname: nom,
      address: adresse,
      city: ville,
      countryCode: pays,
      //waterConsumed: 0,
      //waterConsumptionTarget: 0,
    };

    try {
      const instance = axios.create({
        baseURL: 'http://localhost:3333/api/v1',
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
      });

      const response = await instance.put("/user/profile", userData);
      console.log("Enregistrement réussi :", response.data);
      // Réactive le bouton après l'enregistrement
      saveButtonRef.current.disabled = false;
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      // Réactive le bouton en cas d'erreur
      saveButtonRef.current.disabled = false;
    }
  };

  return (
    <div className='HomePage'>
      <SideBar />
      <div>
        <div className="titre-container">
          <h1 className="titre" style={{ fontFamily: 'Arial' }}>Profil utilisateur</h1>
        </div>

        <div className="rectangleUserProfile">
          <div className="profile-photo-container">
            <div className="photo-wrapper">
              <img
                className={`profile-photo ${isDefaultPhotoLoaded ? "default-photo" : ""}`}
                src={profilePhoto}
                alt="Photo de profil"
                onLoad={handleDefaultPhotoLoad}
              />
            </div>
            <div style={{ position: "absolute", left: "75%", bottom: "0px", transform: "translate(-50%)" }}>
              <input className="input-image" type="file" accept="image/*" onChange={handleEditPhoto} />
            </div>

            <div style={{ position: "absolute", left: "75%", bottom: "70px", transform: "translate(-50%)" }}>
              <input className="input-userProfile" type="text" placeholder="Prénom" id="prenom" name="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            </div>

            <div style={{ position: "absolute", left: "110%", bottom: "70px", transform: "translate(-50%)" }}>
              <input className="input-userProfile" type="text" placeholder="Nom" id="nom" name="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>

            <div style={{ position: "absolute", left: "90%", top: "200px", transform: "translate(-50%)", width: "90%", borderTop: "2px solid #000000" }}></div>

            <div style={{ fontFamily: 'Arial', position: "absolute", left: "52%", top: "200px", transform: "translate(-50%)", textAlign: "left" }}>
              <h2 className="title">Coordonnées</h2>
            </div>

            <div style={{ position: "absolute", left: "60%", top: "300px", transform: "translate(-50%)" }}>
              <input className="input-userProfile" type="text" placeholder="Adresse" id="adresse" name="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
            </div>

            <div style={{ position: "absolute", left: "60%", top: "400px", transform: "translate(-50%)" }}>
              <input className="input-userProfile" type="text" placeholder="Ville" id="ville" name="ville" value={ville} onChange={(e) => setVille(e.target.value)} />
            </div>

            <div style={{ position: "absolute", left: "60%", top: "500px", transform: "translate(-50%)" }}>
              <input className="input-userProfile" type="text" placeholder="Pays" id="pays" name="pays" value={pays} onChange={(e) => setPays(e.target.value)} />
            </div>

          </div>
          <div style={{ position: "absolute", left: "55%", bottom: "25px", transform: "translate(-50%)" }}>
            <button ref={saveButtonRef} className="btn-submit" onClick={handleSave}>Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
