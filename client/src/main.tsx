import './index.css';
import {App} from './components/home/App';
import {createRoot} from "react-dom/client";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BrowserRouter} from "react-router-dom";
import {Auth0ProviderWithNavigate} from "./auth/auth0-provider-with-navigate";

const rootElement = document.getElementById("root");
const queryClient = new QueryClient();

if (rootElement) {
    createRoot(rootElement!).render(
        <BrowserRouter>
            <Auth0ProviderWithNavigate>
                <QueryClientProvider client={queryClient}>
                    <App/>
                </QueryClientProvider>
            </Auth0ProviderWithNavigate>
        </BrowserRouter>
    );
} else {
    console.error("Error: Root element not found!");
}
