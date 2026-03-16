import { useEffect, useState } from 'react'
import { Button } from "flowbite-react";
import { SignupForm } from '../components/Auth/Signup';
import { Outlet } from 'react-router-dom';
import {fetchProducts} from '../services/poducts';

function App() {
  useEffect(() => {
    fetchProducts().then(res => console.log(res.data))
    .catch(err => console.error(err));
  }, [])
  return (
    <>
      <Outlet />
    </>
  )
}

export default App
