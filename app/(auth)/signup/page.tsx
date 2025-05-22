import SignupUserForm from "@/components/auth/signup";
import React, { Suspense } from "react";

const SignupUserPage = () => {
  return (
    <div className="bg-BackgroundColor w-full text-white pt-20 pb-32 max-w-1800 mx-auto flex items-center justify-center h-dvh">
      <div className="flex flex-col w-full md:w-1/2 mx-5">
        <p className="text-center pb-12 font-bold text-lg sm:text-3xl">
          ایجاد حساب کاربری
        </p>
        <Suspense fallback={<div>loading...</div>}>
          <SignupUserForm />
        </Suspense>
      </div>
    </div>
  );
};

export default SignupUserPage;
