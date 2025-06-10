import './index.css';
import reportWebVitals from './reportWebVitals';
import App from '../src/components/home/App';
import { version } from 'react';
import { createRoot } from "react-dom/client";
import { AuthProvider } from 'react-oidc-context';
import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

const oidcConfig = {
    authority: "http://localhost:8081/realms/genesys",
    client_id: "genesys-react-app",
    redirect_uri: "http://localhost:8080/",
};

const userManager = new UserManager({
  authority: "http://localhost:8081/realms/genesys",
  // biome-ignore lint/style/useNamingConvention: Expected
  client_id: "genesys-react-app",
  // biome-ignore lint/style/useNamingConvention: Expected
  redirect_uri: `${window.location.origin}${window.location.pathname}`,
  // biome-ignore lint/style/useNamingConvention: Expected
  post_logout_redirect_uri: window.location.origin,
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  monitorSession: true, // this allows cross tab login/logout detection
});

const onSigninCallback = () => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

const rootElement = document.getElementById("root");

if (rootElement) {
    const root = createRoot(rootElement!);
    root.render(
        <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
            <App />
        </AuthProvider>
    );
} else {
    console.error("Error: Root element not found!");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
