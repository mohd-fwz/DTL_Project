# AI-Powered Voice Biomarker Platform for Early Detection of Neurodegenerative Disorders

A prototype web platform for simulating AI-powered early detection of neurodegenerative disorders using voice biomarkers.

## Features

- **Landing Page**: Hero section with call-to-action for starting assessments
- **Voice Assessment Interface**: Audio recording/upload, visual prompts, simulated AI processing, and results with Gemini AI summary
- **Disease Information**: Educational content about neurodegenerative diseases
- **Team Information**: Showcase of the development team

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **UI Library**: Material UI (v7)
- **Routing**: React Router DOM
- **AI Integration**: Google Gemini API
- **Build Tool**: Vite
- **Styling**: Material UI (no Tailwind CSS as per requirements)

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables: Create `.env` file with `VITE_GEMINI_API_KEY=your_api_key`
4. Run development server: `npm run dev`
5. Build for production: `npm run build`

## Usage

- Navigate to the landing page and click "Start Assessment"
- On the assessment page, record audio or upload a file while describing the reference image
- Click the reference image to trigger simulated processing
- View results and AI-generated summary

## Prototype Notes

This is a demonstration prototype. The AI processing is simulated with random results, and actual voice analysis is not implemented. For production use, integrate real voice biomarker algorithms and ensure proper medical validation.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
