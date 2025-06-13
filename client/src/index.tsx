import './index.css';
import reportWebVitals from './reportWebVitals';
import App from '../src/components/home/App';
import { createRoot } from "react-dom/client";
import { AuthProvider } from 'react-oidc-context';
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import React from 'react';
import { BrowserRouter } from 'react-router';
import NavBar from './components/navigation/NavBar';

const userManager = new UserManager({
    authority: "http://localhost:8081/realms/genesys",
    client_id: "genesys-react-app",
    redirect_uri: `${window.location.origin}${window.location.pathname}`,
    post_logout_redirect_uri: window.location.origin,
    userStore: new WebStorageStateStore({ store: window.sessionStorage }),
    monitorSession: true,
});

const onSigninCallback = () => {
    window.history.replaceState({}, document.title, window.location.pathname);
};

const rootElement = document.getElementById("root");

if (rootElement) {
    createRoot(rootElement!).render(
        <React.StrictMode>
            <BrowserRouter>
                <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
                    <NavBar />
                    <App />
                </AuthProvider>
            </BrowserRouter>

        </React.StrictMode>
    );
} else {
    console.error("Error: Root element not found!");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
