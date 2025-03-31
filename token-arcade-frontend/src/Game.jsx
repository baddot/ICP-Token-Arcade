import React, { useEffect, useRef, useState } from 'react';
import './Game.css'; // Optional: Add styling

import { submitScoreToICP } from "./utils/icpService"; // Adjust path as necessary
import { AuthClient } from "@dfinity/auth-client";


function Game() {
  const canvasRef = useRef(null); // Canvas reference
  const playerRef = useRef({ x: 0, y: 0, dx: 0, width: 100, height: 100 }); // Player state in ref to persist
  //const [score, setScore] = useRef(0);
  const [score, setScore] = useState(0); // Manage score state

  let myscore = 0;

  const [gameOver, setGameOver] = useState(false);
  const obstacles = useRef([]); // Obstacles array
  const animationRef = useRef(null); // Store animation frame reference
  const obstacleSpeed = useRef(6); // Speed reference
  const gameRunning = useRef(null);

  const incrementScore = () => {
    setScore((prevScore) => prevScore + 1); // Correct use of setScore
  };

  const endGameAndSubmitScore = async (finalScore) => {
      setGameOver(true); // End the game

      try {
          const authClient = await AuthClient.create();
          if (await authClient.isAuthenticated()) {
            const identity = authClient.getIdentity();
            await submitScoreToICP(identity, finalScore); // ✅ finalScore = your state
          } else {
            console.warn("User not logged in");
          }
        } catch (err) {
          console.error("❌ Error submitting score:", err);
        }
    };

  useEffect(() => {
    gameRunning.current = true;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set initial player position at the bottom center
    playerRef.current.x = canvas.width / 2 - playerRef.current.width / 2;
    playerRef.current.y = canvas.height - playerRef.current.height - 20;

    const playerImg = new Image();
    playerImg.src = '/assets/fighter_jet_icon.png';

    const obstacleImg = new Image();
    obstacleImg.src = '/assets/rock_icon.png';

    const backgroundImg = new Image();
    backgroundImg.src = '/assets/starry_background.webp';

    const drawBackground = () => {
      ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    };

    const drawPlayer = () => {

      const { x, y, width, height } = playerRef.current;
      console.log('DrawPlayer '+x);
      ctx.drawImage(playerImg, x, y, width, height);
    };

    const drawObstacles = () => {
      obstacles.current.forEach(obstacle => {
        ctx.drawImage(obstacleImg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });
    };

    const moveObstacles = () => {
      obstacles.current.forEach((obstacle, index) => {
        obstacle.y += obstacleSpeed.current;
        if (obstacle.y > canvas.height) {
          obstacles.current.splice(index, 1); // Remove off-screen obstacles
          // setScore(prev => prev + 1); // Increase score
          myscore=myscore+1;
          //incrementScore();
          if ((myscore + 1) % 10 === 0) obstacleSpeed.current += 1; // Increase speed every 10 points
        }
      });
    };

    const checkCollision = () => {
      obstacles.current.forEach(obstacle => {
        const { x, y, width, height } = playerRef.current;
        if (
          x < obstacle.x + obstacle.width &&
          x + width > obstacle.x &&
          y < obstacle.y + obstacle.height &&
          y + height > obstacle.y
        ) {
          setGameOver(true); // End game on collision

          setScore((prevScore) => {
            const finalScore = prevScore + myscore;

            endGameAndSubmitScore(finalScore); // Submit the correct final score
            return finalScore;  // Update the React state correctly
          });

          gameRunning.current = false; // Stop the game loop
        }
      });
    };

    // const checkCollision = () => {
    //   obstacles.current.forEach(obstacle => {
    //     const { x, y, width, height } = playerRef.current;
    //     if (
    //       x < obstacle.x + obstacle.width &&
    //       x + width > obstacle.x &&
    //       y < obstacle.y + obstacle.height &&
    //       y + height > obstacle.y
    //     ) {
    //       setGameOver(true); // End game on collision
    //       // setScore((prevScore) => prevScore + myscore);
    //       const finalScore = prevScore + myscore;
    //       setScore(finalScore);

    //       endGameAndSubmitScore(finalScore);
    //       gameRunning.current = false; // Stop the game loop
    //     }
    //   });
    // };


    const updatePlayerPosition = () => {
      playerRef.current.x += playerRef.current.dx;
      //console.log(playerRef.current.x);
      // Ensure the player stays within the canvas boundaries
      if (playerRef.current.x < 0) playerRef.current.x = 0;
      if (playerRef.current.x + playerRef.current.width > canvas.width) {
        playerRef.current.x = canvas.width - playerRef.current.width;
      }
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      drawBackground();
      drawPlayer();
      drawObstacles();
      moveObstacles();
      updatePlayerPosition();
      checkCollision();
      

      ctx.fillStyle = 'white';
      ctx.font = '20px Arial';
      ctx.fillText(`Score: ${myscore}`, 20, 30);

      if (!gameOver) {
        animationRef.current = requestAnimationFrame(gameLoop); // Continue game loop
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Right') {
        playerRef.current.dx = 5;
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        playerRef.current.dx = -5;
      }
    };

    const handleKeyUp = () => {
      playerRef.current.dx = 0; // Stop movement on key release
    };

    // Add event listeners for controls
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    gameLoop(); // Start the game loop
    const obstacleInterval = setInterval(() => {
      const size = Math.random() < 0.5 ? 50 : 100;
      const x = Math.random() * (canvas.width - size);
      obstacles.current.push({ x, y: 0, width: size, height: size });
    }, 1000); // Create new obstacles every second

    return () => {
      // Cleanup on component unmount
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      clearInterval(obstacleInterval);
      cancelAnimationFrame(animationRef.current); // Stop animation
    };
  }, [score, gameOver]);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }}></canvas>
      {gameOver && (
        <div className="game-over-screen">
          <h1>Game Over!</h1>
          <p>Your final score: {score}</p>
          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default Game;
