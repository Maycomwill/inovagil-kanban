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
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center justify-center space-y-6 px-4"
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
      <div className="flex w-1/2 items-center justify-center">
        <button
          type="submit"
          className="w-full rounded-md bg-zinc-400 px-4 py-2 outline-none transition-colors duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-lime-400 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
