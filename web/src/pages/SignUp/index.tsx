import SignUpSVG from "../../assets/singin-animate.svg";
import { useUser } from "../../hooks/useUser";
import SignUpForm from "../../components/Forms/SignUpForm";
import Loading from "../../components/Loading";

function SignUp() {
  const { isLoading } = useUser();
  return (
    <div className="flex min-h-screen w-full flex-row items-center justify-center">
      <div className="bg-fit flex min-h-screen w-3/5 flex-col items-center justify-center  bg-pattern">
        <img
          src={SignUpSVG}
          className="size-48 md:size-[32rem]"
          alt="SignUp illustration"
        />
      </div>
      <div className="flex w-2/5 flex-col items-center justify-center">
        {isLoading ? <Loading /> : <SignUpForm />}
      </div>
    </div>
  );
}

export default SignUp;
