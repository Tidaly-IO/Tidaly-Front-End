import { useState } from "react";
import { useSensorDetailsModal } from "./Modal";
import axios from 'axios';

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
    setUuid, } = useSensorDetailsModal();

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

  const removeSquare = (index: number) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce capteur ?");
    if (confirmed) {
      const updatedSquares = [...squares];
      updatedSquares.splice(index, 1);
      setSquares(updatedSquares);
    }
  };

  const modifyWaterMeter = () => {
    const confirmed = window.confirm("Voulez-vous modifier ce capteur ?");
    if (confirmed) {
      openModal();
      setUpdateWaterMeter(true);
    }
    console.log(updateWaterMeter);
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
  };
};
