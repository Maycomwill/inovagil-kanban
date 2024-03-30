import { FormEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../Loading";
import { Input } from "../Input";
import { Lock, User } from "lucide-react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    login({ email, password });
    setEmail("");
    setPassword("");
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-3/4 flex-col items-center justify-center space-y-4"
    >
      <Input.Root>
        <Input.Content
          label="Digite seu email:"
          id="email"
          placeholder="Ex: johndoe@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <Input.Icon
          icon={<User className="absolute right-2 top-[45%] text-zinc-500" />}
        />
      </Input.Root>

      <Input.Root>
        <Input.Content
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          label="Digite sua senha:"
        />
        <Input.Icon
          icon={<Lock className="absolute right-2 top-[45%] text-zinc-500" />}
        />
      </Input.Root>

      <div className="flex w-full items-center justify-center">
        <button
          type="submit"
          className="w-full rounded bg-blue-800 py-2 text-zinc-50 outline-none transition-colors duration-150 ease-in-out hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-200 "
        >
          Entrar
        </button>
      </div>
      <div className="w-full text-center text-sm">
        <p>
          Não possui uma conta?{" "}
          <span className="cursor-pointer font-bold text-blue-800 hover:text-blue-700 hover:underline">
            Registre-se
          </span>{" "}
          agora mesmo
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
