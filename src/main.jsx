import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import store from './store/index';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CartProvider } from './context/CartContext.jsx';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
