import { io } from "socket.io-client";

const SOCKET_URL = "https://tidaly-api-backend.onrender.com";

const socket = io(SOCKET_URL, {
    transports: ["websocket"],
    reconnection: true,
});

export default socket;
