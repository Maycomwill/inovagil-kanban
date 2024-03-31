import { AtSign, Lock, User } from "lucide-react";
import { Input } from "../../components/Input";
import { FormEvent, useState } from "react";
import { useUser } from "../../hooks/useUser";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const { createUser } = useUser();
  function handleRegister(e: FormEvent) {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      repassword,
    };
    createUser(data);
    setEmail("");
    setName("");
    setPassword("");
    setRePassword("");
  }
  return (
    <form
      onSubmit={handleRegister}
      className="flex w-full flex-col items-center justify-center space-y-4 px-4"
    >
      <div className="w-2/3">
        <Input.Root>
          <Input.Content
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Digite seu nome"
            placeholder="Ex: Maycom Willams"
            type="text"
            id="name"
          />
          <Input.Icon
            icon={<User className="absolute right-2 top-[45%] text-zinc-500" />}
          />
        </Input.Root>
      </div>
      <div className="w-2/3">
        <Input.Root>
          <Input.Content
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Digite seu email"
            placeholder="Ex: maycom.willams@example.com"
            type="email"
            id="email"
          />
          <Input.Icon
            icon={
              <AtSign className="absolute right-2 top-[45%] text-zinc-500" />
            }
          />
        </Input.Root>
      </div>
      <div className="w-2/3">
        <Input.Root>
          <Input.Content
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Digite sua senha"
            placeholder="**********"
            type="password"
            id="password"
          />
          <Input.Icon
            icon={<Lock className="absolute right-2 top-[45%] text-zinc-500" />}
          />
        </Input.Root>
      </div>
      <div className="w-2/3">
        <Input.Root>
          <Input.Content
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
            label="Digite novamente sua senha"
            placeholder="**********"
            type="password"
            id="repassword"
          />
          <Input.Icon
            icon={<Lock className="absolute right-2 top-[45%] text-zinc-500" />}
          />
        </Input.Root>
      </div>
      <div className="w-2/3">
        <button
          type="submit"
          className="w-full rounded bg-blue-800 py-2 text-zinc-50 outline-none transition-colors duration-150 ease-in-out hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-200 "
        >
          Registrar
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
