import Button from "../../components/button-component/Button";
import Input from "../../components/input-component/Input";
import "./LoginRegistration.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name?: string;
  email: string;
  password: string;
};

const LoginRegistration = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <>
      <div className="container">
        <div className="brand">
          <img src="/user-brand.svg" alt="user icon" />
          <h1>Sistema de Usuários</h1>
          <p>Gerencie seus usuários com facilidade</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="btn-wrap">
            <Button
              text={"Entrar"}
              bgColor={isLogin ? "secondary" : "muted"}
              imgSrc="arrow-to-right.svg"
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
              }}
              style={{ height: "2em", borderRadius: "5px" }}
            />
            <Button
              text={"Cadastrar"}
              bgColor={!isLogin ? "secondary" : "muted"}
              imgSrc="new-user.svg"
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
              }}
              style={{ height: "2em", borderRadius: "5px" }}
            />
          </div>
          <div className="input-area">
            <div className="title-wrap">
              <h1> {isLogin ? "Bem-vindo de volta" : "Criar conta"} </h1>
              <p>
                {isLogin
                  ? "Entre com suas credenciais para acessar"
                  : "Preencha os dados para se cadastrar"}
              </p>
            </div>
            <div className="input-wrap">
              {!isLogin && (
                <Input
                  label="Nome:"
                  imgSrc="user-input.svg"
                  placeholder="Digite seu nome..."
                  type="text"
                  {...register("name", {
                    required: "O nome é obrigatório!",
                    validate: (value?: string) => {
                      if (!value) return true;
                      if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(value)) {
                        return "O nome só pode conter letras!";
                      }
                      return true;
                    },
                  })}
                />
              )}
              {errors.name && !isLogin && (
                <p style={{ color: "red" }}> {errors.name.message} </p>
              )}
            </div>
            <div className="input-wrap">
              <Input
                label="Email:"
                imgSrc="envelope-input.svg"
                placeholder="Digite seu email..."
                type="email"
                {...register("email", {
                  required: "O email é obrigatório!",
                })}
              />
              {errors.email && !isLogin && (
                <p style={{ color: "red" }}> {errors.email.message} </p>
              )}
            </div>
            <div className="input-wrap">
              <Input
                label="Senha:"
                imgSrc="lock-input.svg"
                placeholder="Digite sua senha..."
                type="password"
                {...register("password", {
                  required: "A senha é obrigatária!",
                  minLength: {
                    value: 5,
                    message: "É necessário no minimo 5 caracteres!",
                  },
                  validate: {
                    hasUppercase: (v) =>
                      /[A-Z]/.test(v) || "A senha deve conter letra maiúscula",
                    hasLowercase: (v) =>
                      /[a-z]/.test(v) || "A senha deve conter letra minúscula",
                    hasSpecialChar: (v) =>
                      /[@$!%*?&]/.test(v) || "A senha deve conter: @$!%*?&",
                  },
                })}
              />
              {errors.password && !isLogin && (
                <p style={{ color: "red" }}> {errors.password.message} </p>
              )}
            </div>
            <Button
              type="submit"
              text={isLogin ? "Entrar" : "Cadastrar"}
              bgColor="primary"
              style={{
                alignSelf: "center",
                height: "2.5rem",
                borderRadius: "12px",
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginRegistration;
