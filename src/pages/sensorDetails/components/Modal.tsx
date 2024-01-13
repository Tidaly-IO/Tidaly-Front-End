import React, { useState } from "react";

export const useSensorDetailsModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [widgetName, setWidgetName] = useState('');
  const [sensorType, setSensorType] = useState('waterMeter');
  const [objectifConsommation, setObjectifConsommation] = useState("");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [uuid, setUuid] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedColor('');
    setWidgetName('');
    setSensorType('waterMeter');
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
    objectifConsommation,
    setObjectifConsommation,
    ville,
    setVille,
    codePostal,
    setCodePostal,
    uuid,
    setUuid,
  };
};
