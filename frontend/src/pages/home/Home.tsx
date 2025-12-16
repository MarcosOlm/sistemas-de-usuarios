import { useForm } from "react-hook-form";
import Button from "../../components/button-component/Button";
import Header from "../../components/header-component/Header";
import Input from "../../components/input-component/Input";
import "./Home.css";
import { useState } from "react";
import userService from "../../services/useService";

type FormData = {
  name?: string;
  email?: string;
  telephone?: string;
};

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const values = watch();
  const hasContent = Object.values(values).some(
    (value) => value && value.trim() !== ""
  );

  function submit(data: FormData) {
    async function updateUser() {
      setIsLoading(true);
      const test = await userService.updateUser(data);
      return test;
    }

    updateUser()
      .then((res) => {
        if (res.data.status) {
          alert("Dados alterados com sucesso");
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <Header />
      <main>
        <form onSubmit={handleSubmit(submit)} className="form-put">
          <div className="text-wrap">
            <h2>Meus Dados</h2>
          </div>
          <div className="input-wrap">
            <Input
              label="Nome"
              imgSrc="user-input.svg"
              placeholder="Digite seu novo nome..."
              {...register("name", {
                validate: (value) => {
                  if (value != undefined && value.length > 0) {
                    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(value)) {
                      return "O nome só pode conter letras!";
                    }
                    return true;
                  }
                },
              })}
            />
            {errors?.name && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {errors.name.message}
              </p>
            )}
            <Input
              label="Email"
              imgSrc="envelope-input.svg"
              placeholder="Digite seu novo nome..."
              type="email"
              {...register("email", {
                validate: (value) => {
                  if (
                    value != undefined &&
                    value.length > 0 &&
                    !/[@]/.test(value)
                  ) {
                    return "email deve ter um @";
                  }
                  return true;
                },
              })}
            />
            {errors.email && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {" "}
                {errors.email.message}{" "}
              </p>
            )}
            <Input
              label="Telefone"
              imgSrc="phone-input.svg"
              placeholder="Digite seu novo nome..."
              {...register("telephone", {
                maxLength: {
                  value: 11,
                  message: "Digite somente números!",
                },
                validate: (value) => {
                  if (
                    value != undefined &&
                    value.length > 0 &&
                    value.length < 11
                  ) {
                    return "Digite 11 números!";
                  }
                  return true;
                },
              })}
            />
            {errors?.telephone && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {errors.telephone.message}
              </p>
            )}
            <Button
              text={isLoading ? "salvando alteralções" : "salvar alterações"}
              bgColor="primary"
              disabled={!hasContent || isLoading}
              type="submit"
              style={{
                alignSelf: "center",
                height: "2rem",
                borderRadius: "10px",
                marginTop: "6px",
              }}
            />
          </div>
        </form>
        <section>
          <h2>Usuários Cadastrados</h2>
          <article className="user">
            <div className="letter">G</div>
            <div className="name">👤goat</div>
            <div className="email">📩marcoslimado12384@email.com</div>
            <div className="telephone">📞 Cadastre um telefone</div>
          </article>
          <article className="user">
            <div className="letter">G</div>
            <div className="name">👤 goat</div>
            <div className="email">📩 goat@email.com</div>
            <div className="telephone">📞 83988778877</div>
          </article>
          <article className="user">
            <div className="letter">G</div>
            <div className="name">👤goat</div>
            <div className="email">📩goat@email.com</div>
            <div className="telephone">📞 Cadastre um telefone</div>
          </article>
        </section>
      </main>
    </>
  );
};

export default Home;
