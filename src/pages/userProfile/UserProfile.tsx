import React, { useState, ChangeEvent } from 'react';
import { UserProfileLogic } from "./components/HandleData.tsx";
import SideBar from '.././components/sidebar/SideBar.tsx';
import "./css/UserProfile.css";
import ReactModal from 'react-modal';

export const UserProfile = () => {
  const {
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
    setPrenom,
    setNom,
    setModalOpen,
    setAdresse,
    setVille,
    setCodePostale,
    setPays,
    setNewPassword,
    setOldPassword,
    setNewEmail,
  } = UserProfileLogic();

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
              <input className="input-userProfile" type="text" placeholder="Prénom" id="prenom" name="prenom" value={prenom} onChange={(e: ChangeEvent<HTMLInputElement>) => setPrenom(e.target.value)} />
            </div>

            <div style={{ position: "absolute", left: "110%", bottom: "70px", transform: "translate(-50%)" }}>
              <input className="input-userProfile" type="text" placeholder="Nom" id="nom" name="nom" value={nom} onChange={(e: ChangeEvent<HTMLInputElement>) => setNom(e.target.value)} />
            </div>

            <div style={{ position: "absolute", left: "90%", top: "200px", transform: "translate(-50%)", width: "90%", borderTop: "2px solid #000000" }}></div>

            <div style={{ fontFamily: 'Arial', position: "absolute", left: "52%", top: "200px", transform: "translate(-50%)", textAlign: "left" }}>
              <h2 className="title">Coordonnées</h2>
            </div>

            <div style={{ position: "absolute", left: "110%", top: "260px", transform: "translate(-50%)" }}>
              <button className="btn-submit-mail" onClick={() => setModalOpen(true)}>Changer son mot de passe</button>
            </div>

            <div style={{ position: "absolute", left: "60%", top: "300px", transform: "translate(-50%)" }}>
              <input className="input-userProfile" type="text" placeholder="Adresse" id="adresse" name="adresse" value={adresse} onChange={(e: ChangeEvent<HTMLInputElement>) => setAdresse(e.target.value)} />
            </div>

            <div style={{ position: "absolute", left: "60%", top: "400px", transform: "translate(-50%)" }}>
              <input className="input-userProfile" type="text" placeholder="Ville" id="ville" name="ville" value={ville} onChange={(e: ChangeEvent<HTMLInputElement>) => setVille(e.target.value)} />
            </div>

            <div style={{ position: "absolute", left: "60%", top: "500px", transform: "translate(-50%)" }}>
              <input className="input-userProfile" type="text" placeholder="Code postale" id="codePostale" name="codePostale" value={codePostale} onChange={(e: ChangeEvent<HTMLInputElement>) => setCodePostale(e.target.value)} />
            </div>

            <div style={{ position: "absolute", left: "60%", top: "600px", transform: "translate(-50%)" }}>
              <input className="input-userProfile" type="text" placeholder="Pays" id="pays" name="pays" value={pays} onChange={(e: ChangeEvent<HTMLInputElement>) => setPays(e.target.value)} />
            </div>
          </div>
          <div style={{ position: "absolute", left: "55%", bottom: "25px", transform: "translate(-50%)" }}>
            <button ref={saveButtonRef} className="btn-submit" onClick={handleSave}>Enregistrer</button>
          </div>
        </div>
      </div>

      <ReactModal isOpen={modalOpen} onRequestClose={handleCancel} >
        <h2>Changer le mot de passe</h2>
        <div className="form-group">
          <label htmlFor="newPassword">Nouveau mot de passe</label>
          <div>
            <input type="password" id="newPassword" value={newPassword} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)} />
          </div>
        </div>
        <div>
          <label htmlFor="oldPassword">Confirmer le nouveau mot de passe</label>
          <div>
            <input type="password" id="oldPassword" value={oldPassword} onChange={(e: ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)} />
          </div>
        </div>
        <div className="button-group">
          <button className="btn-submit" onClick={handlePasswordChange}>Changer</button>
          <button className="btn-submit btn-cancel" onClick={handleCancel}>Annuler</button>
        </div>
      </ReactModal>

      <ReactModal isOpen={emailModalOpen} onRequestClose={handleEmailCancel}>
        <h2>Changer l'adresse e-mail</h2>
        <div className="form-group">
          <label htmlFor="newEmail">Nouvelle adresse e-mail</label>
          <div>
            <input type="email" id="newEmail" value={newEmail} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewEmail(e.target.value)} />
          </div>
        </div>
        <div className="button-group">
          <button className="btn-submit" onClick={handleEmailChange}>Changer</button>
          <button className="btn-submit btn-cancel" onClick={handleEmailCancel}>Annuler</button>
        </div>
      </ReactModal>
    </div>
  );
};

export default UserProfile;
