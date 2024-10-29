// src/token-arcade-backend/main.mo

// Import the Array module from the base library
import Array "mo:base/Array";

actor {
  // Declare the type of the scores array
  var scores: [(Text, Nat)] = [];

  // Public function to update the player's score
  public func updateScore(name: Text, score: Nat): async () {
    // Use Array.append to add a new score to the list
    scores := Array.append([(name, score)], scores);
  };

  // Public function to get all player scores
  public func getScores(): async [(Text, Nat)] {
    return scores;
  };
}
