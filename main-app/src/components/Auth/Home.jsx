import React from 'react';
import { Link } from 'react-router-dom';
import "/src/styles/auth.css";

const Home = () => {
    return (
        <div className="background-overlay">
            <div className="content">

                <div className="container" style={{ backgroundColor: "#fffaf0", "padding-right": "3px", "padding-top": "14px", borderRadius: "20px" }}>
                    <h1 className="title"><span>Welcome to CyberQueue</span></h1>
                    <p className="subtitle" style={{ color: "black" }}>Revolutionizing Print Management with Smart, Real-Time Optimization</p>
                </div>

                <div className="buttons-container">
                    <Link to="/login" className="btn login-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Login
                    </Link>
                    <Link to="/register" className="btn register-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;