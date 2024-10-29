import React from 'react';
import './Dashboard.css';

function Dashboard() {
  const startGame = () => {
    const iframe = document.getElementById('gameIframe');
    iframe.src = '/game';
    iframe.style.display = 'block';
  };

  const endGame = () => {
    const iframe = document.getElementById('gameIframe');
    iframe.src = '';
    iframe.style.display = 'none';
  };

  return (
    <div className="dashboard-container">
      <header>
        <h1>ICP Gamer</h1>
      </header>

      <div className="slider">
        <div className="slides">
          <img src="banner1.webp" alt="Fighter Jet 1" />
          <img src="banner2.webp" alt="Fighter Jet 2" />
          <img src="banner3.webp" alt="Fighter Jet 3" />
        </div>
        <div className="slider-nav">
          <button onClick={() => startGame()}>&#10094;</button>
          <button onClick={() => endGame()}>&#10095;</button>
        </div>
      </div>

      <div className="play-button">
        <button onClick={startGame}>Play Now</button>
      </div>

      <iframe id="gameIframe" className="game-iframe" title="Game Iframe"></iframe>
    </div>
  );
}

export default Dashboard;
