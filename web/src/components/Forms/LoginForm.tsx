import { FormEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../Loading";

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
    <div className="flex w-full flex-col items-center justify-center px-4">
      <div className="w-2/3 text-center">
        <p>
          Bem vindo(a), faça login para ter acesso a todas as funcionalidades
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-2/3 flex-col items-center justify-center space-y-6"
      >
        <div className="flex w-full flex-col space-y-2">
          <label htmlFor="email">Digite seu email:</label>
          <input
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md bg-zinc-400 px-2 py-2 outline-none placeholder:text-zinc-900 focus-visible:ring-2 focus-visible:ring-lime-400 dark:bg-slate-700 dark:placeholder:text-zinc-500"
            type="email"
            placeholder="Ex: johndoe@example.com"
            id="email"
          />
        </div>
        <div className="flex w-full flex-col space-y-2">
          <label htmlFor="password">Digite sua senha:</label>
          <input
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md bg-zinc-400 px-2 py-2 outline-none placeholder:text-zinc-900 focus-visible:ring-2 focus-visible:ring-lime-400 dark:bg-slate-700 dark:placeholder:text-zinc-500"
            type="password"
            placeholder="********"
            id="password"
          />
        </div>
        <div className="flex w-full items-center justify-center">
          <button
            type="submit"
            className="w-full rounded-md bg-blue-800 px-4 py-2 text-zinc-100 outline-none transition-colors duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-lime-400 "
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
