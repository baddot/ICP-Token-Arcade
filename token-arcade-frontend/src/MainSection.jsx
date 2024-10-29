import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainSection.css';

function MainSection() {
  const navigate = useNavigate();

  const goToLeaderboard = () => {
    navigate('/leaderboard');
  };

  return (
    <div className="main-section">
      {/* Video Background */}
      <video autoPlay muted loop className="background-video">
        <source src="/assets/background_space_2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Left and Right Graphics */}
      <div className="left-graphic"></div>
      <div className="right-graphic"></div>

      {/* Content Over Video */}
      <div className="content">
        <div className="character">
          <img src="/assets/logo.png" alt="Token Arcade" />
        </div>
        <h1>TOKEN + ARCADE</h1>
        <p>Play, Earn, Win, Repeat</p>
        <button className="signup-button" onClick={goToLeaderboard}>
          Sign In
        </button>

        <section>
          <h2>Play Our Featured Games</h2>
          <div className="games-container" onClick={goToLeaderboard}>
            <img src="/assets/icpbanner.png" alt="Featured Game 1" />
            <img src="/assets/comingsoon.png" alt="Featured Game 2" />
          </div>
        </section>
      </div>
    </div>
  );
}

export default MainSection;
