import SignUpFormComponent from "../../components/Auth/SignUpFormComponent";
import LoginFormComponent from "../../components/Auth/LoginFormComponent";
import { useAuth } from "../../hooks/useAuth"
import { useState } from "react";

export default function AuthPage() {
  const { login, register } = useAuth()
  const [isLogin, setIsLogin] = useState(false)

  const toogleForm = () => {
    setIsLogin(!isLogin)
  }

  return (
    <section className="h-[93vh] w-full">
      {isLogin ?
        <LoginFormComponent action={login} toggle={toogleForm} />
        : <SignUpFormComponent action={register} toggle={toogleForm} />
      }


    </section>
  );
}
