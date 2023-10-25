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
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Must be 8 characters or more')
      .matches(/[a-z]+/, 'One lowercase character')
      .matches(/[A-Z]+/, 'One uppercase character')
      .matches(/[@$!%*#?&]+/, 'One special character')
      .matches(/\d+/, 'One number'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
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
      <div className="h-screen w-full ">
        <div className="relative flex h-full  w-full  flex-col items-center md:flex-row">
          <div className="relative flex h-full  w-full justify-center lg:w-[50%]">
            <div className="flex items-center justify-center lg:w-[55%]">
              <div className="flex h-fit w-full flex-col gap-4">
                <div className="text-heading3 text-black">Login</div>
                <div className="text-heading5 text-grey-50">
                  Welcome back! Please enter your details.
                </div>
                <Button
                  onClick={handleGoogleLogin}
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
                <form className="flex flex-col">
                  <TextFieldComponent
                    label="First Name"
                    type="string"
                    name="firstName"
                    placeholder="Enter your first name"
                    control={control}
                    error={errors?.firstName?.message}
                    endIcon={false}
                    icon={
                      <div className="absolute !z-[1000] h-[16px] p-[18px]">
                        <Image
                          src="/assets/name.svg"
                          width={16}
                          height={16}
                          alt="name"
                        />
                      </div>
                    }
                  />

                  <TextFieldComponent
                    label="Last Name"
                    type="string"
                    name="lastName"
                    placeholder="Enter your last name"
                    control={control}
                    error={errors?.lastName?.message}
                    endIcon={false}
                    icon={
                      <div className="absolute !z-[1000] h-[16px] p-[18px]">
                        <Image
                          src="/assets/name.svg"
                          width={16}
                          height={16}
                          alt="name"
                        />
                      </div>
                    }
                  />
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
                          alt="mail"
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
                          alt="password"
                        />
                      </div>
                    }
                  />
                  <div className="mb-4 flex justify-between">
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
                        I agree to the Terms & Conditions
                      </span>
                    </div>
                  </div>
                  <Button
                    className="!w-full normal-case"
                    onClick={handleSubmit(onSubmit)}
                    type="submit"
                    form="signupForm"
                  >
                    Sign Up
                  </Button>
                </form>
                <div className="flex gap-2">
                  <div className="text-heading6 text-grey-50">
                    Already have an account?
                  </div>
                  <div className="cursor-pointer text-heading6 text-[#4E6BFF]">
                    <Link href="/login">Sign in now.</Link>
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
