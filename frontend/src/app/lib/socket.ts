import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket() {
    if (!socket) {
        socket = io(process.env.BASE_URL || "http://localhost:5000", {
            transports: ["websocket"],
            autoConnect: false,
        });
        socket.connect();
    }
    return socket;
}
