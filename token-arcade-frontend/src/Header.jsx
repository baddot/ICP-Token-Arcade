import React, { useState } from 'react';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthClient } from "@dfinity/auth-client";
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [identityName, setIdentityName] = useState(null); // State to store identity name


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const loginWithICP = async () => {
  //   const authClient = await AuthClient.create();
  //   authClient.login({
  //     identityProvider: "https://identity.ic0.app",
  //     onSuccess: () => {
  //       const identity = authClient.getIdentity();
  //       console.log("Logged in with Identity:", identity.getPrincipal().toText());
  //       // Now that the user is authenticated, we can interact with the smart contract
  //     },
  //   });
  // };

  const loginWithICP = async () => {
    const authClient = await AuthClient.create();
    authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: () => {
        const identity = authClient.getIdentity();
        const identityName = identity.getPrincipal().toText();
        setIdentityName(identityName); // Set identity name in state
        console.log("Logged in with Identity:", identityName);
      },
    });
  };


  return (
    <header className="header">
      <div className="logo">TA</div>
      <nav className="desktop-nav">
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/game">Game</Link>
      </nav>


      {/* Identity Login Button */}
      <button className="login-button" onClick={loginWithICP}>
        <FaUser /> {identityName ? identityName : "Identity Login"}
      </button>

      {/* Hamburger Icon for Mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {isMenuOpen && (
        <nav className="mobile-menu">
          <a href="/" className="menu-item">Home</a>
          <a href="/leaderboard" className="menu-item">Leaderboard</a>
          <a href="/game" className="menu-item">Games</a>
        </nav>
      )}
    </header>
  );
}

export default Header;
