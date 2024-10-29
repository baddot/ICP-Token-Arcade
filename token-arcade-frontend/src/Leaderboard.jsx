import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

function Leaderboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    'assets/banner1.webp',
    'assets/banner2.webp',
    'assets/banner3.webp',
  ];

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

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  // Automatically change slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <h1>LEADERBOARD</h1>
        <p>Compete with others and claim your rewards!</p>
      </header>

      <div className="leaderboard-content">
        <div className="leaderboard-info">
          <img src="/assets/icplogo.png" alt="Internet Computer" className="coin-icon" />
          <div className="info-text">
            <h2>Play Less, Get More</h2>
            <p>Win up to 50ICP Tokens TokenArcade!</p>
          </div>
        </div>

        <button className="gmee-button">Check High Scores</button>


      </div>

      <div className="slider">
        <div
          className="slides"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img key={index} src={slide} alt={`Slide ${index + 1}`} />
          ))}
        </div>
        <div className="slider-nav">
          <button onClick={prevSlide}>&#10094;</button>
          <button onClick={nextSlide}>&#10095;</button>
        </div>
      </div>

      <div className="play-button">
        <button onClick={startGame}>Play Now</button>
      </div>

      <ul className="leaderboard-list">
        <li className="leaderboard-item">Player 1 - 1000 Points</li>
        <li className="leaderboard-item">Player 2 - 800 Points</li>
        <li className="leaderboard-item">Player 3 - 700 Points</li>
      </ul>

      <iframe id="gameIframe" className="game-iframe" title="Game Iframe"></iframe>
      
    </div>
  );
}

export default Leaderboard;
