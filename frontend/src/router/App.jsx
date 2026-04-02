import { useEffect, useState} from 'react'
import { useContext } from 'react';
import { Navbar } from '../components/pages/Navbar';
import {FilterPage} from '../components/Products.jsx/filterProduct'
import { Outlet } from 'react-router-dom';
import { LoginStateStoreProvider } from '../Store/loginState-store';
import { FilterProductStoreProvider } from '../Store/filterProduct-store';
import { FilterProductStore } from '../Store/filterProduct-store';
import {fetchProducts} from '../services/poducts';

function App() {
  
  return (
    <LoginStateStoreProvider>
      <FilterProductStoreProvider>
      <div>
      <Navbar/>
    </div>
      <Outlet />
      </FilterProductStoreProvider>
    </LoginStateStoreProvider>
  )
}

export default App
