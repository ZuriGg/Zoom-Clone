// Importar las dependencias necesarias
const express = require("express");
const http = require("http");
const { ExpressPeerServer } = require("peer");

// Crear una instancia de Express
const app = express();

// Crear el servidor HTTP
const server = http.createServer(app);

// Configurar el servidor PeerJS en el servidor HTTP
const peerServer = ExpressPeerServer(server, {
    // No es necesario especificar un path si no hay un conflicto
});

// Usar el servidor PeerJS en la ruta definida
app.use("/peerjs", peerServer);

// Iniciar el servidor en el puerto 3001
server.listen(3001, () => {
    console.log("Servidor PeerJS escuchando en puerto 3001");
});
