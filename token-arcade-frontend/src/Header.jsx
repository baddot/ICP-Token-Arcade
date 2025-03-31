import React, { useState, useEffect } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client";
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [identityName, setIdentityName] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const loginWithICP = async () => {
    const authClient = await AuthClient.create();
    authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toText();
        setIdentityName(principal);
        localStorage.setItem("icpLoggedIn", "true");
      },
    });
  };

  useEffect(() => {
    // ✅ Restore identity across pages on load
    const restoreIdentity = async () => {
      const isLoggedIn = localStorage.getItem("icpLoggedIn");
      if (isLoggedIn === "true") {
        const authClient = await AuthClient.create();
        if (await authClient.isAuthenticated()) {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal().toText();
          setIdentityName(principal);
        }
      }
    };

    restoreIdentity();
  }, []);

  return (
    <header className="header">
      <div className="logo">TA</div>
      
      <nav className="desktop-nav">
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/game">Game</Link>
      </nav>

      <button className="login-button" onClick={loginWithICP}>
        <FaUser /> {identityName ? identityName : "Login"}
      </button>

      {/* Mobile Menu Toggle */}
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {isMenuOpen && (
        <nav className="mobile-menu">
          <Link to="/" className="menu-item">Home</Link>
          <Link to="/leaderboard" className="menu-item">Leaderboard</Link>
          <Link to="/game" className="menu-item">Game</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
