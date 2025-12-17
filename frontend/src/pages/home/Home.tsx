import { useForm } from "react-hook-form";
import Button from "../../components/button-component/Button";
import Header from "../../components/header-component/Header";
import Input from "../../components/input-component/Input";
import "./Home.css";
import { useEffect, useState } from "react";
import userService from "../../services/useService";

type FormData = {
  name?: string;
  email?: string;
  telephone?: string;
};

const Home = () => {
  // get users
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<FormData[]>([]);

  useEffect(() => {
    async function getAll() {
      return await userService.getAllUsers();
    }

    getAll().then((res) => {
      if (res.data.status && res.data.users) {
        setUsers(res.data.users);
      }
    });
  }, [isLoading]);

  // submit
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
      if (test.data.status) {
        alert("Dados alterados com sucesso");
      }
      setIsLoading(false);
    }

    updateUser();
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
              type="button"
              popoverTarget="popover-btn"
              style={{
                alignSelf: "center",
                height: "2rem",
                borderRadius: "10px",
                marginTop: "6px",
              }}
            />
          </div>

          {/* popover */}
          <div className="popover" id="popover-btn" popover="manual">
            <Button
              text="X"
              bgColor="secondary"
              type="button"
              popoverTarget="popover-btn"
              style={{ width: "2.5em", marginLeft: "auto" }}
            />
            <h2>você deseja alterar?</h2>
            <div className="btn-warp">
              <Button
                text="sim"
                bgColor="primary"
                type="submit"
                style={{ borderRadius: "6px", height: "2em"}}
              />
              <Button
                text="não"
                bgColor="muted"
                type="button"
                popoverTarget="popover-btn"
                style={{ borderRadius: "6px", height: "2em" }}
              />
            </div>
          </div>
        </form>

        {/* users */}
        <section>
          <h2>Usuários Cadastrados</h2>
          {users.map((user, index) => (
            <article className="user" key={index}>
              <div className="letter">
                {user.name?.charAt(0).toLocaleUpperCase()}
              </div>
              <div className="name">👤 {user.name} </div>
              <div className="email">📩 {user.email} </div>
              <div className="telephone">
                📞 {user.telephone || "telefone não cadastrado"}{" "}
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
};

export default Home;
