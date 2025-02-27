const express = require("express");
const http = require("http");
const { ExpressPeerServer } = require("peer");
const cors = require("cors"); // Agregar el middleware CORS

const app = express();
const server = http.createServer(app);

// Permitir solicitudes desde todos los orígenes (o desde un dominio específico de Ngrok)
app.use(cors({ origin: "*" })); // Aquí puedes especificar tu dominio de Ngrok, si prefieres

// Configurar el servidor PeerJS en la ruta "/peerjs"
const peerServer = ExpressPeerServer(server, {
    path: "/peerjs", // Ruta para PeerJS
});

app.use("/peerjs", peerServer); // Usar el servidor PeerJS en la ruta "/peerjs"

// Iniciar el servidor en el puerto 3001
server.listen(3001, () => {
    console.log("Servidor PeerJS escuchando en puerto 3001");
});
