import React, { useState } from "react";

export const useSensorDetailsModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [widgetName, setWidgetName] = useState<string>('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedColor('');
    setWidgetName('');
  };

  return {
    modalIsOpen,
    selectedColor,
    widgetName,
    openModal,
    closeModal,
    setSelectedColor,
    setWidgetName,
  };
};
