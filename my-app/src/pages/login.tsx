'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import TextFieldComponent from '@/components/TextFieldComponent/TextFieldComponent';
import CheckboxIcon, { CheckboxTypes } from '@/components/icons/CheckboxIcon';

function Login() {
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleCheckbox = () => {
    setKeepSignedIn((prev) => !prev);
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleGoogleLogin = () => {};

  const onSubmit = async (data: { email: any; password: any }) => {
    const credentials = {
      email: data.email,
      password: data.password,
      type: 'lawyer',
    };
    try {
      console.log(data);
    } catch (err) {
      console.log('Unable to login');
    }
    setLoading(false);
  };

  return (
    <>
      <div className="h-screen w-full bg-white ">
        <div className="relative flex h-full  w-full  flex-col items-center md:flex-row">
          <div className="relative flex h-full  w-full justify-center lg:w-[50%]">
            <div className="flex items-center justify-center lg:w-[55%]">
              <div className="flex h-fit w-full flex-col gap-4">
                <div className="text-heading3 text-black">Login</div>
                <div className="text-heading6 text-grey-50">
                  Welcome back! Please enter your details.
                </div>
                <Button
                  onClick={handleGoogleLogin}
                  variant="secondary"
                  className="!w-full  normal-case text-[#4E6BFF] flex gap-2 justify-center items-center"
                >
                  <Image
                    src="/assets/googleIcon.png"
                    width={16}
                    height={16}
                    alt="googleIcon"
                  />{' '}
                  Sign in with Google
                </Button>
                <div className="text-2xl h-3 w-full border-grey-65 text-center ">
                  <span className="bg-white px-5  text-[16px] text-grey-65">
                    or Sign in with Email
                  </span>
                </div>
                <form className="flex flex-col ">
                  <TextFieldComponent
                    label="Email Address"
                    type="string"
                    name="email"
                    placeholder="Enter email"
                    control={control}
                    error={errors?.email?.message}
                    endIcon={false}
                    icon={
                      <div className="absolute !z-[1000] h-[16px] p-[18px]">
                        <Image
                          src="/assets/mail.svg"
                          width={16}
                          height={16}
                          alt="mailIcon"
                        />
                      </div>
                    }
                  />

                  <TextFieldComponent
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    control={control}
                    error={errors?.password?.message}
                    endIcon
                    icon={
                      <div className="absolute !z-[1000] h-[16px] p-[18px]">
                        <Image
                          src="/assets/password.svg"
                          width={16}
                          height={16}
                          alt="passwordIcon"
                        />
                      </div>
                    }
                  />
                  <div className="my-4 flex justify-between">
                    <div className="flex">
                      <button
                        type="button"
                        className="mr-[5.17px]"
                        onClick={handleCheckbox}
                      >
                        {keepSignedIn && (
                          <CheckboxIcon icon={CheckboxTypes.checkboxTicked} />
                        )}
                        {!keepSignedIn && (
                          <CheckboxIcon icon={CheckboxTypes.checkboxUnticked} />
                        )}
                      </button>
                      <span className="text-body2 text-grey-50">
                        Keep me logged in
                      </span>
                    </div>
                    <div className="cursor-pointer text-[16px] font-[500] leading-[24px] text-bBlack-60">
                      <Link href="/forgot-password">Forgot Password?</Link>
                    </div>
                  </div>
                  <Button
                    className="!w-full normal-case"
                    onClick={handleSubmit(onSubmit)}
                    type="submit"
                    form="loginForm"
                    variant="secondary"
                  >
                    Login
                  </Button>
                </form>
                <div className="flex gap-2">
                  <div className=" text-subTitle1   text-grey-50">
                    Don't have an account?
                  </div>
                  <div className="cursor-pointer  text-[#4E6BFF]">
                    <Link href="/signup">Sign up now.</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex h-full  w-full justify-center lg:w-[50%]">
            <img
              src="/assets/banner.jpg"
              alt="login"
              className=" object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
