import './App.css'
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Home from './pages/home/Home'
import userService from './services/useService';

function App() {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    async function verifyUser() {
      const res = await userService.auth();
      setAuth(res.data.status)
    }
    
    verifyUser()
  }, [])

  if (auth === null) {
    return (
      <>
        <div className="loading">
          <p>Carregando...</p>
        </div>
      </>
    );
  }

  return auth ? <Home /> : <Navigate to="/login-registration" replace />;
}

export default App
