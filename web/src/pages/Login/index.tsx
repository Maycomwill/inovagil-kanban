import LoginForm from "../../components/Forms/LoginForm";

function Login() {
  return (
    <div className="flex min-h-screen w-full flex-row bg-zinc-100 text-zinc-900 dark:bg-slate-900 dark:text-zinc-50">
      <div className="flex w-3/5 items-center justify-center bg-red-700">
        <span>teste</span>
      </div>
      <div className="flex w-2/5 items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
