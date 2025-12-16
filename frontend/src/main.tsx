import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import LoginRegistration from './pages/login-registration/LoginRegistration.tsx';

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login-registration",
    element: <LoginRegistration />
  }
]); 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
