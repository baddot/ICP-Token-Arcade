import { Actor, HttpAgent } from "@dfinity/agent";
//import { idlFactory, canisterId } from "../declarations/token-arcade-backend"; // ✅ Correct path & name
//import { canisterId as backendCanisterId } from "../declarations/token-arcade-backend";

import { idlFactory } from "../declarations/token-arcade-backend"; // only import idlFactory



const canisterId = "niyfw-oaaaa-aaaal-qna4q-cai"; 

// Optional: use anonymous actor for read-only calls
const createAnonymousActor = () => {
  const agent = new HttpAgent();
  return Actor.createActor(idlFactory, { agent, canisterId }); // ✅ FIXED
};

// Create an authenticated actor
export const createActor = (identity) => {
  const agent = new HttpAgent({ identity });
  return Actor.createActor(idlFactory, { agent, canisterId }); // ✅ FIXED
};

// Submit score with identity
export const submitScoreToICP = async (identity, score) => {
  const actor = createActor(identity);
  const name = identity.getPrincipal().toText();

  try {
    await actor.updateScore(name, score);
    console.log("✅ Score submitted:", name, score);
  } catch (error) {
    console.error("❌ Failed to submit score:", error);
  }
};

// Fetch leaderboard
export const fetchLeaderboard = async () => {
  try {
    const actor = createAnonymousActor();
    const raw = await actor.getScores();
    console.log("📦 Raw scores from canister:", raw);

    // Correctly handle ICP returned tuples (objects with numbered keys)
    const cleaned = raw.map(entry => [
      entry[0] || "Unknown",
      entry[1] !== undefined ? Number(entry[1]) : 0
    ]);

    return cleaned;
  } catch (error) {
    console.error("❌ Failed to fetch leaderboard:", error);
    return [];
  }
};

