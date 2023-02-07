import SignUpFormComponent from "../../components/Auth/SignUpFormComponent";
import { useAuth } from "../../hooks/useAuth"

export default function AuthPage() {
  const { login, register } = useAuth()
  return (
      <section className="h-[93vh] w-full">
        <SignUpFormComponent action={register} />
      </section>
  );
}
