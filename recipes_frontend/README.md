# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify
- **Configurable API**: Switch between local mocks and a real backend via environment variables

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

By default, the app uses local mocks (no backend required).

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Environment-based API configuration

This app can fetch data from either:
- Local in-app mocks (default)
- A real backend API

Control this behavior using environment variables in a `.env` file (create it from `.env.example`):

- `REACT_APP_USE_MOCKS`:
  - `true` (default): Use local mock data (no network calls).
  - `false`: Use the real backend.
- `REACT_APP_API_BASE_URL`:
  - Base URL of your backend when using real API (e.g., `http://localhost:8080`).

Steps:
1. Copy the example file:
   - `cp .env.example .env`
2. For mocks (default): keep `REACT_APP_USE_MOCKS=true`
3. For backend:
   - Set `REACT_APP_USE_MOCKS=false`
   - Set `REACT_APP_API_BASE_URL=http://localhost:8080` (or your API URL)
4. Restart `npm start` after changing env vars.

Convenience scripts:
- `npm run start:mock` — force mocks in dev
- `npm run build:mock` — build with mocks enabled

## Expected REST API (when REACT_APP_USE_MOCKS=false)

The frontend expects a backend that implements these endpoints:

- GET `${REACT_APP_API_BASE_URL}/api/recipes`
  - Query params:
    - `query` (string, optional) — search by title
    - `cuisine` (string, optional) — exact match
    - `diet` (string, optional) — exact match
    - `timeMin` (number, optional) — minimum cooking time (inclusive)
    - `timeMax` (number, optional) — maximum cooking time (inclusive)
    - `page` (number, optional, default 1)
    - `pageSize` (number, optional, default 12)
  - Response (200):
    ```
    {
      "items": [ { "id": "1", "title": "...", "cuisine": "...", "diet": "...", "time": 25, "rating": 4, "image": "url", "description": "...", "ingredients": [...], "steps": [...] }, ... ],
      "total": 123
    }
    ```
- GET `${REACT_APP_API_BASE_URL}/api/recipes/{id}`
  - Path params:
    - `id` (string)
  - Response (200):
    ```
    {
      "id": "1",
      "title": "...",
      "cuisine": "...",
      "diet": "...",
      "time": 25,
      "rating": 4,
      "image": "url",
      "description": "...",
      "ingredients": ["..."],
      "steps": ["..."]
    }
    ```
- Error responses:
  - Non-200 should include status codes (e.g., 404 Not Found). The UI displays a generic error message on failures.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
