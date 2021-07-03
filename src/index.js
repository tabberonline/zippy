import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './utility/userContext';
import { Provider } from 'react-redux';
import {store} from './app/store'

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);