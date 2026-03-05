import { Routes, Route } from "react-router-dom";
import Home from "./main_app/Home.jsx";
import Explore from "./main_app/Explore.jsx";
import Hotels from "./main_app/Hotels.jsx";


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/plan-your-trip/:destination" element={<Hotels />} />
        </Routes>
    );
    
}