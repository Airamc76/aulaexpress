
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import AppTest from './AppTest';
import ErrorBoundary from './components/ErrorBoundary';

console.log('Starting app...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Could not find root element to mount to");
  throw new Error("Could not find root element to mount to");
}

console.log('Root element found, mounting React...');

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  console.log('React mounted successfully');
} catch (error) {
  console.error('Error mounting React:', error);
}
