import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import './index.css';
import { NotificationContextProvider } from './NotificationContext';
import { UserContextProvider } from './UserContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Set staleTime globally
      cacheTime: 1000 * 60 * 60, // Set cacheTime globally
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const combineContexts = contexts => {
  return ({ children }) => {
    return contexts.reduceRight(
      (accumulatedContext, CurrentContext) => (
        <CurrentContext>{accumulatedContext}</CurrentContext>
      ),
      children
    );
  };
};

const AllContexts = combineContexts([
  NotificationContextProvider,
  UserContextProvider,
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <AllContexts>
        <App />
      </AllContexts>
    </QueryClientProvider>
  </Router>
);
