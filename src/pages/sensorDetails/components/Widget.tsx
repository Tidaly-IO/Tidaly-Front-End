import { useState } from "react";
import { useSensorDetailsModal } from "./Modal";
import axios from 'axios';
import Swal from 'sweetalert2';

export const useSensorDetailsLogic = () => {
  const [squares, setSquares] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [updateWaterMeter, setUpdateWaterMeter] = useState<boolean>(false);

  const { modalIsOpen, selectedColor, widgetName, openModal, closeModal, setSelectedColor, setWidgetName, sensorType,
    setSensorType,
    objectifConsommation,
    setObjectifConsommation,
    ville,
    setVille,
    codePostal,
    setCodePostal,
    uuid,
    setUuid,
    consommationActuelle,
    setConsommationActuelle
     } = useSensorDetailsModal();

  const getRandomValue = () => {
    const value = Math.floor(Math.random() * 1000) / 10;
    return `${value} L`;
  };

  const getSquareColor = (color: string) => {
    switch (color) {
      case "red":
        return "rgba(255, 0, 0, 0.5)";
      case "yellow":
        return "rgba(255, 255, 0, 0.5)";
      case "blue":
        return "rgba(0, 0, 255, 0.5)";
      default:
        return "#ccc";
    }
  };

  const renderCircle = (value: number) => {
    const percentage = Math.floor((value / 100) * 100);
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <svg width={radius * 2} height={radius * 2}>
        <circle cx={radius} cy={radius} r={radius - 5} fill="none" stroke="#ccc" strokeWidth="5" />
        <circle
          cx={radius}
          cy={radius}
          r={radius - 5}
          fill="none"
          stroke="green"
          strokeWidth="5"
          strokeDasharray={`${percentage / 100 * circumference} ${circumference}`}
          strokeDashoffset={`${offset}`}
          strokeLinecap="round"
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="18px">
          {percentage}%
        </text>
      </svg>
    );
  };

  const createHub = async () => {
    console.log('Création du hub...');
    console.log(consommationActuelle);
    const instance = axios.create({
      baseURL: 'https://tidaly-api-backend.onrender.com',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    });

    try {
      const response = await instance.post('/api/v1/hub', {
        postalCode: codePostal,
        uuid: uuid,
        city: ville,
        waterConsumptionTarget: objectifConsommation,
      });

      console.log('Objectif de consommation mis à jour.');
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  };

  const updateHub = async () => {
    console.log('modification du hub...');
    console.log(consommationActuelle);
    const instance = axios.create({
      baseURL: 'https://tidaly-api-backend.onrender.com',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    });

    try {
      const response = await instance.put('/api/v1/hub', {
        postalCode: codePostal,
        uuid: uuid,
        city: ville,
        waterConsumptionTarget: objectifConsommation,
      });

      console.log('Objectif de consommation mis à jour.');
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  };
  

  const addSquare = () => {
    if (sensorType === "waterMeter") {
      console.log(updateWaterMeter);
      if (updateWaterMeter) {
        updateHub();
        setUpdateWaterMeter(false);
        closeModal();
      }
      else {
        createHub();
        closeModal();
      }
    }
    else {
      const percentage = Math.floor(Math.random() * 100);
      const random = Math.floor(Math.random() * 100) + " L";
      setSquares([...squares, { name: widgetName, color: getSquareColor(selectedColor), percentage, value: getRandomValue(), random}]);
      closeModal();
    }
  };

  const removeSquare = async (index: number) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Que voulez-vous faire avec ce capteur ?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Modifier',
      cancelButtonText: 'Supprimer',
      showCloseButton: true,
      focusConfirm: false,
      focusCancel: false,
      reverseButtons: false,
    });

    if (isConfirmed) {
      console.log("L'utilisateur a choisi de modifier le capteur.");
    } else {
      const { isConfirmed: confirmDelete } = await Swal.fire({
        title: 'Confirmation',
        text: 'Voulez-vous vraiment supprimer ce capteur ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler',
        reverseButtons: false,
      });
      if (confirmDelete) {
        const updatedSquares = [...squares];
        updatedSquares.splice(index, 1);
        setSquares(updatedSquares);
      } else {
        console.log("L'utilisateur a annulé la suppression.");
      }
    }
  };

  const modifyWaterMeter = async () => {
    const { isConfirmed } = await Swal.fire({
      title: 'Que voulez-vous faire avec ce capteur ?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Modifier',
      cancelButtonText: 'Supprimer',
      showCloseButton: true,
      focusConfirm: false,
      focusCancel: false,
      reverseButtons: false,
    });

    if (isConfirmed) {
      openModal();
      setUpdateWaterMeter(true);
      console.log("L'utilisateur a choisi de modifier le capteur.");
    } else {
      const { isConfirmed: confirmDelete } = await Swal.fire({
        title: 'Confirmation',
        text: 'Voulez-vous vraiment supprimer ce capteur ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler',
        reverseButtons: false,
      });
  
      if (confirmDelete) {
        console.log("L'utilisateur a choisi de supprimer le capteur.");
      } else {
        console.log("L'utilisateur a annulé la suppression.");
      }
    }
  };

  return {
    squares,
    searchTerm,
    setSquares,
    setSearchTerm,
    modalIsOpen,
    selectedColor,
    widgetName,
    openModal,
    closeModal,
    setSelectedColor,
    setWidgetName,
    getRandomValue,
    getSquareColor,
    renderCircle,
    addSquare,
    removeSquare,
    sensorType,
    setSensorType,
    objectifConsommation,
    setObjectifConsommation,
    ville,
    setVille,
    codePostal,
    setCodePostal,
    uuid,
    setUuid,
    modifyWaterMeter,
    updateWaterMeter,
    consommationActuelle,
    setConsommationActuelle,
  };
};
