import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Peer from "peerjs";

const Room = () => {
    const { roomId } = useParams(); // Obtener el ID de la sala de la URL
    const [peerId, setPeerId] = useState(""); // Almacenar el ID de PeerJS
    const [stream, setStream] = useState(null); // Almacenar el stream de audio

    const userVideoRef = useRef(null); // Referencia al video del usuario
    const [peer, setPeer] = useState(null); // Instancia de PeerJS

    // Mantener la referencia al call y los usuarios conectados
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [callPeerId, setCallPeerId] = useState(""); // Para ingresar el ID de usuario al que se quiere llamar

    useEffect(() => {
        // Pedir acceso al micrófono
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((mediaStream) => {
                setStream(mediaStream);
                if (userVideoRef.current) {
                    userVideoRef.current.srcObject = mediaStream; // Mostrar audio del usuario
                }
            })
            .catch((err) => {
                console.error("Error al acceder al micrófono: ", err);
            });

        const peerInstance = new Peer(undefined, {
            host: "localhost", // Dirección del servidor PeerJS
            port: 3001, // Puerto donde está corriendo el servidor PeerJS
            path: "/peerjs", // Ruta que coincide con el servidor PeerJS
        });

        // Establecer el ID del peer
        peerInstance.on("open", (id) => {
            setPeerId(id);
            console.log("Peer conectado con ID:", id);
        });

        // Manejar la llamada entrante
        peerInstance.on("call", (call) => {
            console.log("Recibiendo llamada de", call.peer);
            // Responder con el stream de audio
            call.answer(stream);
            call.on("stream", (remoteStream) => {
                // Reproducir el stream de audio del otro usuario
                const audio = document.createElement("audio");
                audio.srcObject = remoteStream;
                audio.play();
            });
        });

        setPeer(peerInstance);

        return () => {
            peerInstance.destroy(); // Destruir el peer cuando el componente se desmonte
        };
    }, []);

    // Función para hacer la llamada a otro usuario
    const handleCallUser = (userId) => {
        if (!peer || userId === peerId) {
            console.error(
                "No se puede llamar a sí mismo o Peer no está inicializado"
            );
            return;
        }

        const call = peer.call(userId, stream); // Llamar al otro usuario con su ID de Peer
        call.on("stream", (remoteStream) => {
            const audio = document.createElement("audio");
            audio.srcObject = remoteStream;
            audio.play(); // Reproducir el audio del otro usuario
        });

        // Agregar usuario a la lista de usuarios conectados
        setConnectedUsers((prevUsers) => [...prevUsers, userId]);
    };

    return (
        <div>
            <h1>Sala: {roomId}</h1>
            <div>
                <h2>Tu ID de Peer: {peerId}</h2>
                <video ref={userVideoRef} autoPlay muted></video>
                <input
                    type="text"
                    placeholder="ID del usuario a llamar"
                    value={callPeerId}
                    onChange={(e) => setCallPeerId(e.target.value)}
                />
                <button onClick={() => handleCallUser(callPeerId)}>
                    Llamar a otro usuario
                </button>
                {connectedUsers.map((userId) => (
                    <div key={userId}>
                        <h3>Conectado con: {userId}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Room;
