import React from 'react';
import * as yup from 'yup';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  useCreateSuperviseMutation,
  useGetAcademicOrganisationQuery,
} from '@/store/auth';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldComponent from '@/components/TextFieldComponent/TextFieldComponent';
import Image from 'next/image';
import Select from 'react-select';
import { Button } from '@/components/ui/button';
import { useSetOrgRepMutation } from '@/store/auth';
import { setStatus } from '@/store/toaster/slice';
import { useDispatch } from '@/store/store';
import { CircularProgress } from '@mui/material';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import SearchUsers from '@/molecules/SearchUsers';
import SearchUsersStudents from '@/molecules/SearchUsersStudents';
import { Calendar } from '@/components/ui/calendar';

function CreateSupervise() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
  });
  const [createSupervisee, { isLoading }] = useCreateSuperviseMutation();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    const credentials = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };
    try {
      const response = await createSupervisee(credentials).unwrap();
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
            message: 'User Invited Successful',
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
  return (
    <div>
      <Header />
      <div className=" space-y-6 p-10 pb-16 md:block">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Invite Users </h3>
          </div>
          <Separator />
          <div className="max-w-[600px] w-full justify-center items-center">
            <Form {...form}>
              <div className="flex flex-col"></div>
              <TextFieldComponent
                label="First Name"
                type="string"
                name="firstName"
                placeholder="Enter  first name"
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
                placeholder="Enter last name"
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
                label="Email Address"
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

              <Button
                className="!w-full normal-case flex gap-4 mt-4"
                onClick={form.handleSubmit(onSubmit)}
                type="submit"
                form="loginForm"
                variant="secondary"
              >
                Add
                {isLoading && (
                  <CircularProgress size={16} style={{ color: '#333333' }} />
                )}
              </Button>
            </Form>
          </div>
        </div>
        <SearchUsersStudents />
      </div>
    </div>
  );
}

export default CreateSupervise;
