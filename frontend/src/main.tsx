import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import App from './App.tsx'
import LoginRegistration from './pages/login-registration/LoginRegistration.tsx';

let router = createBrowserRouter([
  {
    path: "/",
    Component: App
  },
  {
    path: "/login-registration",
    Component: LoginRegistration
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
