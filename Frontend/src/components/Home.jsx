import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const roomId = uuidv4(); // Generar un ID único para la sala

    const handleJoinRoom = () => {
        // Navegar a la sala cuando el usuario quiera unirse
        navigate(`/${roomId}`);
    };

    return (
        <div>
            <h1>Bienvenido a la sala de videollamadas</h1>
            <button onClick={handleJoinRoom}>Crear y Unirse a Sala</button>
            <p>
                Comparte este enlace:{" "}
                <a href={`/${roomId}`}>
                    {window.location.origin}/{roomId}
                </a>
            </p>
        </div>
    );
};

export default Home;
