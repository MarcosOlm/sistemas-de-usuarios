import { useNavigate } from "react-router-dom";
import userService from "../../services/useService";
import Button from "../button-component/Button";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  function logout() {
    async function logOutUser() {
      await userService.logout();
      navigate('/login-registration')
    }
    logOutUser();
  }

  return (
      <header>
        <div className="band">
          <img src="user-brand.svg" />
          <h1>Sistema de Usuários</h1>
          <p>Gerencie seus dados</p>
        </div>
        <Button
          text="Sair"
          imgSrc="arrow-to-right.svg"
          bgColor="secondary"
          className="logout"
          style={{fontSize: "12px"}}
          onClick={() => {logout()}}
        />
      </header>
  );
};

export default Header;
