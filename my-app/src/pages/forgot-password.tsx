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
import { useForgotPasswordMutation, useLoginMutation } from '@/store/auth';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from '@/store/store';
import { setStatus } from '@/store/toaster/slice';

function Login() {
  const dispatch = useDispatch();
  const toasterStatus = useSelector((state) => state.toaster);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);
  const [
    forgotPassword,
    { isLoading, error: forgotPasswordError, data: forgotPasswordData },
  ] = useForgotPasswordMutation();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: { email: string }) => {
    const credentials = {
      email: data.email,
    };
    try {
      const response = await forgotPassword(credentials).unwrap();
      if (response?.error) {
        dispatch(
          setStatus({
            type: 'error',
            message: response?.error?.data?.message || 'Failed Pls Try Again',
            timeout: 4000,
          })
        );
      } else {
        dispatch(
          setStatus({
            type: 'success',
            message: 'Email Sent Successful Please Check Your Email and Reset',
            timeout: 4000,
          })
        );
        setEmailSentSuccess(true);
      }
    } catch (err) {
      dispatch(
        setStatus({
          type: 'error',
          message: 'Failed Pls Try Again',
          timeout: 4000,
        })
      );
    }
  };

  return (
    <>
      <div className="h-screen w-full bg-white ">
        <div className="relative flex h-full  w-full  flex-col items-center md:flex-row">
          <div className="relative flex h-full  w-full justify-center lg:w-[50%]">
            <div className="flex items-center justify-center lg:w-[55%]">
              <div className="flex h-fit w-full flex-col gap-4">
                <div className="text-heading3 text-black">Forgot Password</div>
                <div className="text-heading6 text-grey-50">
                  Please enter your email id to proceed
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
                  <Button
                    className="!w-full normal-case flex gap-4"
                    onClick={handleSubmit(onSubmit)}
                    type="submit"
                    form="loginForm"
                    variant="secondary"
                  >
                    Send Email To Reset Password
                    {isLoading && (
                      <CircularProgress
                        size={16}
                        style={{ color: '#333333' }}
                      />
                    )}
                  </Button>
                </form>

                <div className="flex gap-2">
                  <div className=" text-subTitle1   text-grey-50">
                    You have an account?
                  </div>
                  <div className="cursor-pointer  text-[#4E6BFF]">
                    <Link href="/login">Log In</Link>
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
