import TextFieldComponent from '@/components/TextFieldComponent/TextFieldComponent';
import { Button } from '@/components/ui/button';
import {
  useConfirmEmailMutation,
  useResetPasswordMutation,
} from '@/store/auth';
import { useDispatch } from '@/store/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { setStatus } from '@/store/toaster/slice';
import { useRouter } from 'next/router';

function index() {
  const [resetPassword, { isLoading, isError }] = useResetPasswordMutation();
  const validationSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  // const handleConfirmEmail = () => {
  //   const confirmToken = window.location.href.split('confirm/')[1];
  //   confirmEmail(confirmToken);
  // };

  // useEffect(() => {
  //   handleConfirmEmail();
  // }, []);

  const onSubmit = async (data: any) => {
    const confirmToken = window.location.href.split('reset-password/')[1];
    const credentials = {
      password1: data.confirmPassword,
      password: data.password,
      resetToken: confirmToken,
    };
    try {
      const response = await resetPassword(credentials).unwrap();
      if (response?.error) {
        dispatch(
          setStatus({
            type: 'error',
            message:
              response?.error?.data?.message ||
              'Reset Password Failed Pls Try Again',
            timeout: 4000,
          })
        );
      } else {
        dispatch(
          setStatus({
            type: 'success',
            message: 'Reset Password Successful please login with new password',
            timeout: 4000,
          })
        );
        router.push('/login');
      }
    } catch (err) {
      dispatch(
        setStatus({
          type: 'error',
          message: 'Reset Password Failed Pls Try Again',
          timeout: 4000,
        })
      );
    }
  };

  return (
    <>
      <div className="h-full w-full ">
        <div className="relative flex h-full  w-full  flex-col items-center md:flex-row">
          <div className="relative flex h-screen  lg:h-full  w-full justify-center lg:w-[50%] overflow-scroll  no-scrollbar">
            <form className="flex flex-col w-full p-4 h-full justify-center items-center  ">
              <div className="text-heading3 text-black text-left w-full">
                Forgot Password
              </div>
              <div className="text-heading6 text-grey-50 text-left w-full mb-4">
                Please enter your new password
              </div>
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
                    <img
                      src="/assets/password.svg"
                      width={16}
                      height={16}
                      alt="passwordIcon"
                    />
                  </div>
                }
              />

              <TextFieldComponent
                label="Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                control={control}
                error={errors?.confirmPassword?.message}
                endIcon
                icon={
                  <div className="absolute !z-[1000] h-[16px] p-[18px]">
                    <img
                      src="/assets/password.svg"
                      width={16}
                      height={16}
                      alt="passwordIcon"
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
                Change Password
                {isLoading && (
                  <CircularProgress size={16} style={{ color: '#333333' }} />
                )}
              </Button>
            </form>

            {/* {isError ? (
              <div className="flex justify-center items-center gap-4   flex-col w-full">
                <div>Authentication failed pls try again </div>
                <Button
                  className="w-fit"
                  variant="secondary"
                  onClick={() => {
                    window.location.href = '/login';
                  }}
                >
                  Go Back To Login
                </Button>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-4   flex-col w-full">
                {!isLoading && (
                  <CircularProgress size={36} style={{ color: '#333333' }} />
                )}
                <div>Authenticating</div>
              </div>
            )} */}
          </div>
          <div className="relative  h-full  w-full justify-center lg:w-[50%] lg:h-screen hidden lg:flex">
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

export default index;
