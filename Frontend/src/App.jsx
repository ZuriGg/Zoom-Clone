import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Room from "./components/Room";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:roomId" element={<Room />} />
            </Routes>
        </Router>
    );
};

export default App;
