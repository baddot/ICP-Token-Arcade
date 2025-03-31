import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLeaderboard } from './utils/icpService'; // Adjust path if needed
import './Leaderboard.css';

function Leaderboard() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scores, setScores] = useState([]); // ✅ State for leaderboard
  const navigate = useNavigate();

  const slides = [
    'assets/banner1.webp',
    'assets/banner2.webp',
    'assets/banner3.webp',
  ];

  const startGame = () => {
    navigate("/game");
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
    return () => clearInterval(interval);
  }, []);

  // ✅ Fetch leaderboard from canister
  useEffect(() => {
    const loadScores = async () => {
      const result = await fetchLeaderboard();

      const sorted = result
        .sort((a, b) => b[1] - a[1])
        .slice(0, 50);

      setScores(sorted);
    };
    loadScores();
  }, []);



  // useEffect(() => {
  //   const loadScores = async () => {
  //     const result = await fetchLeaderboard();
  //     // const sorted = result.sort((a, b) => b[1] - a[1]); // Highest scores first
  //     const sorted = result.sort((a, b) => Number(b[1]) - Number(a[1])); 
  //     setScores(sorted);
  //   };
  //   loadScores();
  // }, []);

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

      {/* ✅ Dynamic leaderboard from canister */}
      <ul className="leaderboard-list">
        {scores.length === 0 ? (
          <li className="leaderboard-item">Loading scores...</li>
        ) : (
          scores.map(([name, score], index) => (
            <li key={index} className="leaderboard-item">
              #{index + 1} {name} - {score} Points
            </li>
          ))
        )}
      </ul>

      <iframe id="gameIframe" className="game-iframe" title="Game Iframe"></iframe>
    </div>
  );
}

export default Leaderboard;
