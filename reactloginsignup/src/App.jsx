import React,{useState} from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { LoginFormWrapper } from './components/LoginForm';
import { SignupFormWrapper } from './components/SignupForm';

const router=createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/loginform" replace />,
  },
  {
    path: "/loginform",
    element: <LoginFormWrapper />,
  },
  {
    path: "/signupform",
    element: <SignupFormWrapper />,
  },
])

function App(){
  return(
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App;



