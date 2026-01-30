# Decentralized Digital Document Verification System

A Web3 platform where **authorized institutions** issue digital documents and **anyone** can verify them on the blockchain. Documents are stored on **IPFS**; only **SHA-256 hashes** are stored on **Polygon**.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Vite, ethers.js, MetaMask
- **Blockchain:** Polygon (Amoy testnet), Solidity
- **Storage:** IPFS via Pinata
- **Backend:** Node.js (Express) – file upload, SHA-256 hashing, IPFS upload

## User Roles

1. **Admin / Issuing Authority** – Contract owner; adds/removes issuers.
2. **Document Holder (Citizen)** – Receives documents and verification links/QR codes.
3. **Verifier** – Anyone can verify by uploading a file or entering a document ID.

## Features

- Wallet-based auth (MetaMask)
- Issuer dashboard: upload PDF/image → hash → IPFS → record on chain
- Smart contract: `issueDocument`, `verifyDocument`, `revokeDocument`, `getDocumentDetails`
- Public verification: upload file or enter ID → VALID / INVALID
- QR code per document (links to verification page)
- Document expiry, revocation, audit trail, search by ID, IPFS download

## Project Structure

```
Front-end/
├── contracts/
│   └── DocumentVerification.sol   # Smart contract
├── scripts/
│   └── deploy.js                  # Hardhat deploy
├── backend/                       # Node.js API
│   ├── index.js                   # Express, /api/upload, /api/hash
│   ├── ipfs.js                    # Pinata IPFS
│   ├── hash.js                    # SHA-256
│   └── package.json
├── src/
│   ├── context/Web3Context.jsx    # MetaMask, contract
│   ├── contracts/abi.js           # Contract ABI
│   ├── config.js                  # Env config
│   ├── utils/api.js               # Backend API client
│   ├── utils/hash.js              # Client-side SHA-256 (Web Crypto)
│   ├── components/
│   ├── pages/
│   └── App.jsx
├── hardhat.config.js
├── tailwind.config.js
└── package.json
```

## Setup

### 1. Install dependencies

```bash
npm install
cd backend && npm install && cd ..
```

### 2. Environment variables

**Backend** (`backend/.env`):

```
PINATA_JWT=your_pinata_jwt
PORT=4000
```

Get a JWT from [Pinata](https://app.pinata.cloud/) → API Keys.

**Frontend** (`.env` in project root):

```
VITE_API_URL=                    # Leave empty in dev (uses proxy). In prod, set to API origin e.g. https://api.example.com
VITE_CONTRACT_ADDRESS=           # After deploy, set contract address
VITE_CHAIN_ID=80002              # Polygon Amoy
VITE_RPC_URL=https://rpc-amoy.polygon.technology/
VITE_APP_BASE_URL=               # Optional; defaults to current origin for QR links
```

**Deploy** (optional, for Hardhat):

```
POLYGON_AMOY_RPC=https://rpc-amoy.polygon.technology/
PRIVATE_KEY=your_private_key
```

### 3. Compile & deploy contract

**Local (Hardhat node):**

```bash
npm run node          # Terminal 1: local chain
npm run deploy:local  # Terminal 2: deploy
```

Then set `VITE_CONTRACT_ADDRESS` to the printed address.

**Polygon Amoy:**

```bash
npm run compile
npm run deploy:amoy   # Uses POLYGON_AMOY_RPC, PRIVATE_KEY
```

Set `VITE_CONTRACT_ADDRESS` and ensure frontend `.env` uses Amoy.

### 4. Run app

**Terminal 1 – Backend:**

```bash
npm run backend
```

**Terminal 2 – Frontend:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use MetaMask on Polygon Amoy (or localhost 8545 for local).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing (about, how it works) |
| `/connect` | Connect MetaMask |
| `/issuer` | Issuer dashboard (list, link to upload) |
| `/upload` | Upload & issue document (issuers only) |
| `/verify` | Verify by file or document ID |
| `/document` | Enter ID → view details |
| `/document/:id` | Document details, QR, download, revoke |
| `/admin` | Manage issuers (owner only) |

## Security

- No document content on-chain; only hashes.
- Role-based access: only authorized issuers can issue; only issuer or owner can revoke.
- Input validation (file type, size, address format).
- Duplicate hashes rejected by contract.

## License

MIT
