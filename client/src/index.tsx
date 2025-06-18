import './index.css';
import reportWebVitals from './reportWebVitals';
import App from '../src/components/home/App';
import React from 'react';
import { version } from 'react';
import {createRoot} from "react-dom/client";
import { OidcProvider } from "./auth/OidcProvider";

const rootElement = document.getElementById("root");

if (rootElement) {
    const root = createRoot(rootElement!);
    root.render(
        <OidcProvider>
            <App />
        </OidcProvider>
    );
} else {
    console.error("Error: Root element not found!");
}


console.log(version);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
