import React from "react";
import { useNavigate } from "react-router-dom"; 
import Button from "./search.jsx";
import SearchBar from "./Search_bar.jsx";
import UploadPdf from "./UploadPdf.jsx";

const Input = () => {
    const navigate = useNavigate(); 

    const handleSubmit = () => {
        try {
            navigate('/search'); 
        } catch (error) {
            console.error("Navigation error: ", error);
        }
    };

    return (
        <>
            <UploadPdf/>
            <div className="home-container"> {/* Centering container */}
              
            </div>
        </>
    );
}

export default Input;
