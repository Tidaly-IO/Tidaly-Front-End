import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from "axios";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [notificationReceived, setNotificationReceived] = useState(false);
  const [updateHub, setUpdateHub] = useState(false);
  const [hubID, setHubID] = useState('');
  const [notifConsumption, setNotifConsumption] = useState('');
  const [socket, setSocket] = useState(null);

  const getHubID = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setHubID(''); // Réinitialiser le hubID si aucun token
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get('https://tidaly-api-backend.onrender.com/consumption/global?period=currentWeek', config);
      console.log("HubID récupéré:", response.data.hubUuid);
      setHubID(response.data.hubUuid || ''); // Réinitialiser si aucune donnée
    } catch (error) {
      console.error("Erreur lors de la récupération du hubID: ", error);
      setHubID(''); // Réinitialiser en cas d'erreur
    }
  };

  // Recharger le hubID à chaque changement de compte (basé sur le token)
  useEffect(() => {
    getHubID();
  }, [localStorage.getItem("token")]); // Recalculer si le token change

  useEffect(() => {
    const newSocket = io('https://tidaly-sse.onrender.com');
    setSocket(newSocket);

    newSocket.on('notify', () => {
      setNotificationReceived(true);
    });

    newSocket.on('update', () => {
      setUpdateHub(true);
      getHubID()
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);


  useEffect(() => {
    if (!socket || !hubID) return;

    const channel = `waterConsumption/${hubID}`;
    socket.on(channel, (message) => {
      console.log("Message reçu:", message.data);
      setNotifConsumption(message.data);
    });

    // Supprimer les anciens listeners lors du changement de hubID
    return () => {
      socket.off(channel);
    };
  }, [hubID, socket]); // Réexécuter lorsque hubID ou socket change

  return (
    <WebSocketContext.Provider
      value={{
        notificationReceived,
        setNotificationReceived,
        updateHub,
        setUpdateHub,
        notifConsumption,
        setNotifConsumption,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
