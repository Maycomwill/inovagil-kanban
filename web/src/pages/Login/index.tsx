import Kanban from "../../assets/kanban.svg";
import LoginForm from "../../components/Forms/LoginForm";

function Login() {
  return (
    <div className="bg-fit flex min-h-screen w-full flex-col bg-pattern text-zinc-900 md:flex-row-reverse dark:text-zinc-50">
      <div className="flex w-full items-center justify-center py-12 md:w-3/5 md:py-0">
        <img
          src={Kanban}
          alt="KanBan Illustration"
          className="size-72 md:size-[36rem]"
        />
      </div>
      <div className="relative flex w-full flex-1 items-start justify-center rounded-t-2xl bg-zinc-100 pt-12 md:w-2/5 md:pt-0 dark:bg-slate-900">
        <div className="absolute top-4 h-2 w-1/2 rounded-full bg-zinc-300 md:invisible" />
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
