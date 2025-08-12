import './index.css';
import reportWebVitals from './reportWebVitals';
import App from '../src/components/home/App';
import {createRoot} from "react-dom/client";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BrowserRouter} from "react-router";

const rootElement = document.getElementById("root");
const queryClient = new QueryClient();

if (rootElement) {
    createRoot(rootElement!).render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </QueryClientProvider>
    );
} else {
    console.error("Error: Root element not found!");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
