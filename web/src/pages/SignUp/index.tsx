import SignUpSVG from "../../assets/singin-animate.svg";
import { useUser } from "../../hooks/useUser";
import SignUpForm from "../../components/Forms/SignUpForm";
import Loading from "../../components/Loading";

function SignUp() {
  const { isLoading } = useUser();
  return (
    <div className="bg-fit flex min-h-screen w-full flex-col items-center justify-start space-y-6 bg-pattern md:flex-row md:space-y-0">
      <div className="flex w-full flex-col items-center justify-center py-12 md:min-h-screen md:w-3/5 md:py-0">
        <img
          src={SignUpSVG}
          className="size-48 md:size-[32rem]"
          alt="SignUp illustration"
        />
      </div>
      <div className="relative flex w-full flex-1 flex-col items-start justify-center rounded-t-2xl bg-zinc-100 pt-6 md:w-2/5 md:pt-0 dark:bg-slate-900">
        <div className="absolute h-2 w-1/2 top-4 translate-x-1/2 rounded-full  bg-zinc-100 md:invisible" />
        {isLoading ? <Loading /> : <SignUpForm />}
      </div>
    </div>
  );
}

export default SignUp;
