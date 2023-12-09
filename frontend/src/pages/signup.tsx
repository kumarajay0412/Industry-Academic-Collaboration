'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import TextFieldComponent from '@/components/TextFieldComponent/TextFieldComponent';
import CheckboxIcon, { CheckboxTypes } from '@/components/icons/CheckboxIcon';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  useGetAcademicOrganisationQuery,
  useGetAreaOfInterestQuery,
  useGetIndustryOrganisationQuery,
  useGetOrganisationQuery,
} from '@/store/auth';
import Select from 'react-select';
import { transparent } from 'tailwindcss/colors';
import { useSignUpMutation } from '@/store/auth';
import { useDispatch } from '@/store/store';
import { setStatus } from '@/store/toaster/slice';
import { CircularProgress } from '@mui/material';

const otherOption = { value: 99999999999999, label: 'Other' };
const araofinterestotheroption = { value: 99999999999999, label: 'Other' };

function Login() {
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [orgName, setOrgName] = useState('');

  const [signUp, { isLoading }] = useSignUpMutation();
  const dispatch = useDispatch();

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
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm Password is required'),
    role: yup.string().required('Role is required'),
    orgId: yup.object().required('Organisation is required'),
    areaOfInterest: yup.array().required('Area of Interest is required'),
  });
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleGoogleLogin = () => {};
  const watchRole = form.watch('role');
  const { data: organisations } = useGetOrganisationQuery({
    name: orgName,
    type: watchRole || '',
  });
  const { data: areaOfInterestData } = useGetAreaOfInterestQuery({});

  const onSubmit = async (data: any) => {
    const credentials = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      orgId: data.orgId.value,
      password: data.password,
      password1: data.confirmPassword,
      isEmailVerified: true,
      role: data.role === 'INDUSTRY' ? 'INDUSTRY_REP' : 'ACADEMIC_REP',
      isVerified: true,
      areasofInterest: data.areaOfInterest.map((area: any) => area.value),
      isPoc: true,
    };
    try {
      const response = await signUp(credentials).unwrap();
      if (response?.error) {
        dispatch(
          setStatus({
            type: 'error',
            message:
              response?.error?.data?.message || 'Request Failed Pls Try Again',
            timeout: 4000,
          })
        );
      } else {
        dispatch(
          setStatus({
            type: 'success',
            message: 'Sign Up Successful please verify your email',
            timeout: 4000,
          })
        );
      }
    } catch (err) {
      dispatch(
        setStatus({
          type: 'error',
          message: 'Request Failed Pls Try Again',
          timeout: 4000,
        })
      );
    }
  };
  const selectOptionsOrganisations =
    organisations && organisations.length > 0
      ? organisations
          .map((org: any) => ({
            value: org.id, // Assuming you have an 'id' field
            label: org.name,
          }))
          .concat(otherOption)
      : [otherOption];

  const selectOptionsAreaOfInterest = areaOfInterestData?.map((data: any) => ({
    value: data.id, // Assuming you have an 'id' field
    label: data.title,
  }));

  return (
    <>
      <div className="h-full w-full ">
        <div className="relative flex h-full  w-full  flex-col items-center md:flex-row">
          <div className="relative flex h-full  w-full justify-center lg:w-[50%] overflow-scroll  no-scrollbar">
            <div className="flex items-center justify-center lg:w-[55%]">
              <div className="flex h-fit w-full flex-col gap-2">
                <div className="text-heading3 text-black">Sign Up</div>
                <div className="text-heading5 text-grey-50">
                  Welcome! Please enter your details.
                </div>

                <Form {...form}>
                  <div className="flex flex-col"></div>
                  <TextFieldComponent
                    label="First Name"
                    type="string"
                    name="firstName"
                    placeholder="Enter your first name"
                    control={form.control}
                    error={form?.formState.errors?.firstName?.message}
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
                    control={form.control}
                    error={form?.formState?.errors?.lastName?.message}
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
                    label="Official Email Address"
                    type="string"
                    name="email"
                    placeholder="Enter email"
                    control={form.control}
                    error={form?.formState?.errors?.email?.message}
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
                    control={form.control}
                    error={form?.formState?.errors?.password?.message}
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
                  <TextFieldComponent
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Enter password"
                    control={form?.control}
                    error={form?.formState?.errors?.confirmPassword?.message}
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
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex  space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="INDUSTRY" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Industry
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="ACADEMIC" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Academic
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="orgId"
                    render={({ field }) => (
                      <div className="space-y-3">
                        <FormLabel>Organisation</FormLabel>
                        <Select
                          {...field}
                          onInputChange={(value) =>
                            setOrgName(value) as unknown as void
                          }
                          onChange={
                            field.onChange as unknown as (value: any) => void
                          }
                          maxMenuHeight={150}
                          options={selectOptionsOrganisations}
                          className="!w-full"
                        />
                        <FormMessage />
                      </div>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="areaOfInterest"
                    render={({ field }) => (
                      <div className="space-y-3">
                        <FormLabel>Area of Interest</FormLabel>
                        <Select
                          {...field}
                          // onInputChange={(value) =>
                          //   setOrgName(value) as unknown as void
                          // }
                          onChange={
                            field.onChange as unknown as (value: any) => void
                          }
                          isMulti
                          maxMenuHeight={150}
                          options={selectOptionsAreaOfInterest}
                          className="!w-full"
                        />
                        <FormMessage />
                      </div>
                    )}
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
                        I agree to the Terms & Conditions and you are approved
                        by your organisation to sign up.
                      </span>
                    </div>
                  </div>

                  <Button
                    className="!w-full normal-case flex gap-4"
                    onClick={form.handleSubmit(onSubmit)}
                    type="submit"
                    form="loginForm"
                    variant="secondary"
                  >
                    Sign Up
                    {isLoading && (
                      <CircularProgress
                        size={16}
                        style={{ color: '#333333' }}
                      />
                    )}
                  </Button>
                </Form>
                <div className="flex gap-2">
                  <div className=" text-subTitle1   text-grey-50">
                    Already have an account?
                  </div>
                  <div className="cursor-pointer  text-[#4E6BFF]">
                    <Link href="/login">Sign in now.</Link>
                  </div>
                </div>
              </div>
            </div>
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

export default Login;
