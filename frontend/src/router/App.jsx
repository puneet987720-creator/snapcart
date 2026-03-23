import { useEffect, useState } from 'react'
import { Navbar } from '../components/pages/Navbar';
import { Outlet } from 'react-router-dom';
import { LoginStateStoreProvider } from '../Store/loginState-store';
import {fetchProducts} from '../services/poducts';

function App() {
  return (
    <LoginStateStoreProvider>
      <div>
      <Navbar />
    </div>
      <Outlet />
    </LoginStateStoreProvider>
  )
}

export default App
