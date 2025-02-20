import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from './context/expenses';
import { BrowserRouter, Routes, Route } from "react-router";
import Expense from './components/expenses/Expenses';
import Categorie from './components/categories/Categorie';
import { ProviderC } from './context/categories';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProviderC>
  <Provider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Expense />} />
        <Route path="/categories" element={<Categorie />} />
      </Routes>
    </BrowserRouter>
  </Provider>
  </ProviderC>
);


