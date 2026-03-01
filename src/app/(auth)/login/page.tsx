import LoginForm from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import TransitionLink from "@/components/utils/TransitionLink";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const page = () => {
  return (
    <div className="flex h-svh min-h-185 items-center justify-center px-5">
      <div className="border w-full max-w-100 p-10 rounded-2xl flex flex-col items-center gap-7">
        <h1 className="uppercase font-semibold font-barlow-condensed text-6xl  text-center">
          Login
        </h1>
        <div className="w-full">
          <LoginForm />
        </div>
        <Button asChild variant={"link"} className="inline-block">
          <TransitionLink href={"/register"}>
            don&apos;t have an account?
          </TransitionLink>
        </Button>
      </div>
    </div>
  );
};

export default page;
