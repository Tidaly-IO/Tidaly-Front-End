import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SideBar from '../components/SideBar';
import "../css/UserProfile.css";
import loupe from '../assets/loupe.png';
import ReactModal from 'react-modal';

export const UserProfile = () => {
    const [profilePhoto, setProfilePhoto] = useState("https://www.w3schools.com/howto/img_avatar.png");
    const [isDefaultPhotoLoaded, setIsDefaultPhotoLoaded] = useState(false);
    const [sexe, setSexe] = useState("Homme");

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
                            <input className="input-userProfile" type="text" placeholder="Prénom" id="prenom" name="prenom" />
                        </div>

                        <div style={{ position: "absolute", left: "110%", bottom: "70px", transform: "translate(-50%)" }}>
                            <input className="input-userProfile" type="text" placeholder="Nom" id="nom" name="nom" />
                        </div>

                        <div style={{ position: "absolute", left: "110%", bottom: "0px", transform: "translate(-50%)" }}>
                            <select className="inputClass" value={sexe} id="sexe" name="sexe" onChange={handleSexeChange}>
                                <option value="Homme">Homme</option>
                                <option value="Femme">Femme</option>
                            </select>
                        </div>


                        <div style={{ position: "absolute", left: "90%", top: "200px", transform: "translate(-50%)", width: "90%", borderTop: "2px solid #000000" }}></div>

                        <div style={{ fontFamily: 'Arial', position: "absolute", left: "52%", top: "200px", transform: "translate(-50%)", textAlign: "left" }}>
                            <h2 className="title">Coordonnées</h2>
                        </div>

                        <div style={{ position: "absolute", left: "60%", top: "300px", transform: "translate(-50%)" }}>
                            <input className="input-userProfile" type="text" placeholder="Adresse" id="adresse" name="adresse" />
                        </div>

                        <div style={{ position: "absolute", left: "60%", top: "400px", transform: "translate(-50%)" }}>
                            <input className="input-userProfile" type="text" placeholder="Ville" id="ville" name="ville" />
                        </div>

                        <div style={{ position: "absolute", left: "60%", top: "500px", transform: "translate(-50%)" }}>
                            <input className="input-userProfile" type="text" placeholder="Pays" id="pays" name="pays" />
                        </div>

                    </div>
                    <div style={{ position: "absolute", left: "55%", bottom: "25px", transform: "translate(-50%)" }}>
                        <button className="btn-submit">Enregistrer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
