
# Token Arcade: Frontend and Backend on ICP

## Overview

**Token Arcade** is a decentralized gaming platform deployed on the Internet Computer (ICP) blockchain. It includes:

- **Frontend**: A React-based gaming interface.
- **Backend**: Motoko smart contracts handling game logic and storing high scores.
- **Authentication**: Integrated with ICP’s **Internet Identity** for secure login.

This project demonstrates how blockchain-based gaming works with **smart contracts** on the ICP, featuring seamless communication between frontend and backend.

---

## Project Structure

```
/token-arcade-development
  ├── token-arcade-backend       # Backend canister (Motoko code)
  │     └── src
  │         └── main.mo          # Backend smart contract logic
  ├── token-arcade-frontend      # Frontend React app
  │     ├── dist                 # Built frontend assets
  │     └── src
  │         └── index.jsx        # Frontend entry point
  │     └── package.json         # Frontend dependencies
  ├── dfx.json                   # DFX configuration
  ├── canister_ids.json          # Canister IDs for deployment
  └── README.md                  # Project documentation (this file)
```

---

## Features

- **Blockchain Integration**: Stores scores on-chain using ICP smart contracts.
- **Internet Identity Login**: Secure login through **Internet Identity**.
- **Motoko Smart Contract**: Backend logic implemented in **Motoko**.
- **Decentralized Hosting**: Frontend and backend hosted on the ICP blockchain.

---

## Setup and Installation

### Prerequisites

1. Install **DFX SDK**:
   ```bash
   sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   ```
2. Install **Node.js**:
   - Download from [Node.js](https://nodejs.org/) and install the latest LTS version.

3. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd token-arcade-development
   ```

---

## 1. Deploy Backend (Motoko Canister)

1. Navigate to the backend folder:
   ```bash
   cd token-arcade-backend
   ```

2. Deploy the backend canister:
   ```bash
   dfx deploy token-arcade-backend --network ic
   ```

3. Retrieve the backend canister ID:
   ```bash
   dfx canister id token-arcade-backend
   ```

---

## 2. Build and Deploy Frontend

1. Navigate to the frontend folder:
   ```bash
   cd ../token-arcade-frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Build the frontend:
   ```bash
   npm run build
   ```

4. Deploy the frontend canister:
   ```bash
   dfx deploy token-arcade-frontend --network ic
   ```

5. Retrieve the frontend canister ID:
   ```bash
   dfx canister id token-arcade-frontend
   ```

---

## 3. Configure Environment Variables

Create a `.env` file in the **frontend folder** with your canister IDs:

```
VITE_BACKEND_CANISTER_ID=<backend-canister-id>
VITE_IDENTITY_PROVIDER=https://identity.ic0.app
```

---

## 4. Run the Application Locally

1. Start the DFX network locally:
   ```bash
   dfx start --clean
   ```

2. Deploy all canisters locally:
   ```bash
   dfx deploy
   ```

3. Access the frontend:
   ```
   http://localhost:8080
   ```

---

## 5. Authentication with Internet Identity

1. Add the **Internet Identity Login** in the `Header.jsx`:

   ```javascript
   import { AuthClient } from "@dfinity/auth-client";

   const loginWithICP = async () => {
     const authClient = await AuthClient.create();
     authClient.login({
       identityProvider: "https://identity.ic0.app",
       onSuccess: () => {
         const identity = authClient.getIdentity();
         console.log("Logged in as:", identity.getPrincipal().toText());
       },
     });
   };
   ```

2. Use the **logged-in identity** to submit scores:

   ```javascript
   import { Actor, HttpAgent } from "@dfinity/agent";
   import { idlFactory } from "../utils/canister_idl";

   const backendCanisterId = process.env.VITE_BACKEND_CANISTER_ID;

   const createActor = (identity) => {
     const agent = new HttpAgent({ identity });
     return Actor.createActor(idlFactory, { agent, canisterId: backendCanisterId });
   };

   const submitScoreToICP = async (identity, score) => {
     const actor = createActor(identity);
     await actor.updateScore(score);
   };
   ```

---

## 6. Deploy to ICP Network

Deploy your canisters to the **ICP network**:

```bash
dfx deploy --network ic
```

Verify the deployed frontend:

```
https://<frontend-canister-id>.ic0.app
```

---

## 7. Troubleshooting

- **Error: "Could not resolve @dfinity/agent"**:  
  Run the following:
  ```bash
  npm install @dfinity/agent @dfinity/auth-client
  ```

- **Check Canister Status**:
  ```bash
  dfx canister status token-arcade-backend
  dfx canister status token-arcade-frontend
  ```

---

## License

This project is licensed under the MIT License.

---

## Contributing

Feel free to contribute by submitting pull requests. Please ensure all contributions adhere to the project’s coding standards.
