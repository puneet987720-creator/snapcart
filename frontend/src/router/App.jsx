import { useEffect, useState} from 'react'
import { useContext } from 'react';
import { Navbar } from '../components/pages/Navbar';
import {FilterPage} from '../components/Products.jsx/filterProduct'
import { Outlet } from 'react-router-dom';
import { AddToCartStoreProvider } from '../Store/addToCart-Store';
import { LoginStateStoreProvider } from '../Store/loginState-store';
import { OrderProductStoreProvider } from '../Store/orderProduct-store';
import { FilterProductStoreProvider } from '../Store/filterProduct-store';
import { FilterProductStore } from '../Store/filterProduct-store';
import {fetchProducts} from '../services/poducts';

function App() {
  
  return (
    <AddToCartStoreProvider>
      <LoginStateStoreProvider>
        <OrderProductStoreProvider>
        <FilterProductStoreProvider>
          <div>
            <Navbar/>
          </div>
          <Outlet />
        </FilterProductStoreProvider>
        </OrderProductStoreProvider>
      </LoginStateStoreProvider>
    </AddToCartStoreProvider>
  )
}

export default App
