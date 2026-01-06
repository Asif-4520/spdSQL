import { createRoot } from 'react-dom/client';
import './styles/index.css';
import AppRouter from './routes/router';
import GlobalContext from './context/GlobalContext';
import { Toaster } from 'react-hot-toast';
import { SettingsProvider } from './store';

const rootElement = document.getElementById('root');
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/sw.js')
            .then((reg) => {
                console.info('SW registered:', reg.scope);
            })
            .catch((err) => {
                console.info('SW failed:', err);
            });
    });
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
    });
}
if (rootElement) {
    createRoot(rootElement).render(
        <GlobalContext>
            <SettingsProvider>
                <AppRouter />
                <Toaster />
            </SettingsProvider>
        </GlobalContext>
    );
}
