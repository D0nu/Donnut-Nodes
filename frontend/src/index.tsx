import './index.css';
import App from './App';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from "@react-oauth/google";

const body = document.querySelector('body');
if (!body) throw new Error("Body element not found");

const root = ReactDOM.createRoot(body);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

