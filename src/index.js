import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CallContextProvider } from './contexts/CallContextProvider';
import { LoaderContextProvider } from './contexts/LoaderContextProvider';
import { ErrorContextProvider } from './contexts/ErrorHandlerProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CallContextProvider>
      <LoaderContextProvider>
        <ErrorContextProvider>
          <App />
        </ErrorContextProvider>
      </LoaderContextProvider>
    </CallContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
