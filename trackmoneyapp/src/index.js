import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from './context/expenses';
import { BrowserRouter, Routes, Route } from "react-router";
import Expense from './components/expenses/Expenses';
import Categorie from './components/categories/Categorie';
import { ProviderC } from './context/categories';
import Navbar from './components/features/Navbar';
import { ProviderU } from './context/user';
import SignUp from './components/users/SignUp';
import SignIn from './components/users/SignIn';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <main className='bg-green-100'>
  <ProviderU>
  <ProviderC>
  <Provider>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/expenses" element={<Expense />} />
        <Route path="/categories" element={<Categorie />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  </Provider>
  </ProviderC>
  </ProviderU>
  </main>
);


