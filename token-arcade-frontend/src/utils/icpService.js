import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./canister_idl"; // Import your canister IDL

const canisterId = "br5f7-7uaaa-aaaaa-qaaca-cai"; // Replace with your canister ID

// Initialize actor to interact with the canister
export const createActor = (identity) => {
  const agent = new HttpAgent({ identity });
  return Actor.createActor(idlFactory, { agent, canisterId });
};

// Submit score to the canister
export const submitScoreToICP = async (identity, score) => {
  const actor = createActor(identity);
  try {
    const result = await actor.updateScore(score);
    console.log("Score submitted:", result);
  } catch (error) {
    console.error("Failed to submit score:", error);
  }
};