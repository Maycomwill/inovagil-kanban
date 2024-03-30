import Kanban from "../../assets/kanban.svg";
import LoginForm from "../../components/Forms/LoginForm";

function Login() {
  return (
    <div className="flex min-h-screen w-full flex-row-reverse bg-zinc-100 text-zinc-900 dark:bg-slate-900 dark:text-zinc-50">
      <div className="bg-pattern flex w-3/5 items-center justify-center">
        <img
          src={Kanban}
          alt="KanBan Illustration"
          className="size-72 md:size-[36rem]"
        />
      </div>
      <div className="flex w-2/5 items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center px-4">
          <h1 className="fong-regular mb-4 w-full text-center text-xl md:w-3/4">
            Bem vindo(a), faça login para acessar todas as funcionalidades
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
