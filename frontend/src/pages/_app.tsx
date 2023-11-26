import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/store';
import { RouteGuard } from '@/components/RouteGuard';
import 'react-toastify/dist/ReactToastify.css';
import AppContent from '@/components/AppContent';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <RouteGuard>
        <AppContent />
        <Component {...pageProps} />
      </RouteGuard>
    </Provider>
  );
}
