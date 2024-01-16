import React, { useState } from "react";

export const useSensorDetailsModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [widgetName, setWidgetName] = useState('');
  const [sensorType, setSensorType] = useState('waterMeter');
  const [jointWaterMeter, setjointWaterMeter] = useState('No');
  const [objectifConsommation, setObjectifConsommation] = useState("");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [uuid, setUuid] = useState("");
  const [consommationActuelle, setConsommationActuelle] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedColor('');
    setWidgetName('');
    setSensorType('waterMeter');
    setjointWaterMeter('No');
    setObjectifConsommation("");
    setVille("");
    setCodePostal("");
    setUuid("");
  };

  const modalStyle = {
    content: {
      width: '50%',
      height: '50%',
      margin: 'auto',
    },
  };

  return {
    modalIsOpen,
    selectedColor,
    widgetName,
    openModal,
    closeModal,
    setSelectedColor,
    setWidgetName,
    modalStyle,
    sensorType,
    setSensorType,
    jointWaterMeter,
    setjointWaterMeter,
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
  };
};
