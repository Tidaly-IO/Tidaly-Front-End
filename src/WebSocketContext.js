import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [notificationReceived, setNotificationReceived] = useState(false);
  const [updateHub, setUpdateHub] = useState(false);

  useEffect(() => {

    const socket = io('https://tidaly-sse.onrender.com');

    socket.on('notify', () => {
      setNotificationReceived(true);
    });

    socket.on('update', () => {  // supprime, update ou add sensor / update et add waterMeter / objectif de conso
      setUpdateHub(true);
    });

    // Déconnecte le socket lorsque le composant est démonté
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ notificationReceived, setNotificationReceived, updateHub, setUpdateHub }}>
      {children}
    </WebSocketContext.Provider>
  );
};
