import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const handleLogout = async () => {
        setLoading(true);
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("uid");
            console.info("logout success");
            navigate("/login");
        } catch {
            setError("500");
        } finally {
            setLoading(false);
        }
    };


    return (<button
        className={`bg-red-500 text-white px-4 py-2 rounded-lg fixed top-4 right-4 hover:bg-red-700`}
        onClick={handleLogout}>
        Logout
    </button>);
};

export default LogoutBtn;