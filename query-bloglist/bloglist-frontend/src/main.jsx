import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import './index.css';
import { NotificationContextProvider } from './NotificationContext';
import { UserContextProvider } from './UserContext';

const queryClient = new QueryClient();

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
  <QueryClientProvider client={queryClient}>
    <AllContexts>
      <App />
    </AllContexts>
  </QueryClientProvider>
);
