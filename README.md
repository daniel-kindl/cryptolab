# Cryptolab

An interactive, client-side educational web app that explains and visualizes Encoding, Hashing, and Encryption.

## Features

- **Encoding Lab**: Visualize UTF-8, Base64, and URL encoding with byte-level inspection.
- **Hashing Lab**: Explore MD5, SHA-1, SHA-256, and the Avalanche Effect with real-time visualization.
- **Encryption Lab**: Toy ciphers (Caesar, XOR) and Block Cipher Modes (ECB vs CBC) visualized.
- **Pitfalls**: Interactive demos of common security mistakes (e.g., ECB Penguin, Key Reuse).
- **Educator Mode**: Toggle detailed explanations and teaching notes for classroom use.
- **Smart Presets**: Load specific scenarios via URL parameters (e.g., `?scenario=avalanche`).

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: React 18 + Vite
- **UI**: Mantine v7 + Tabler Icons
- **Animation**: Framer Motion
- **Testing**: Vitest + Playwright

## Development

1.  Install dependencies: `npm install`
2.  Run the development server: `npm run dev`
3.  Open `http://localhost:5173`

## Testing

-   Run unit tests: `npm run test`
-   Run E2E tests: `npm run test:e2e`
-   View coverage: `npm run coverage`

## Deployment

This project is configured to deploy to GitHub Pages via GitHub Actions.
