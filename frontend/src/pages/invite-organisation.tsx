import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
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
import { useGetAcademicOrganisationQuery } from '@/store/auth';
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

function InviteOrganisation() {
  const { data: AcademicOrganisations } = useGetAcademicOrganisationQuery({});
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),

    orgId: yup.object().required('Organisation is required'),
  });
  const [setOrgRep, { isLoading }] = useSetOrgRepMutation();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    const credentials = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      orgId: data.orgId.value,
      isEmailVerified: true,
      role: 'ACADEMIC_REP',
      isVerified: true,
    };
    try {
      const response = await setOrgRep(credentials).unwrap();
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
            message: 'Org Rep Successful',
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
            <h3 className="text-lg font-medium">
              Invite Organisation Representative{' '}
            </h3>
            {/* <p className="text-sm text-muted-foreground">
              This is how others will see you on the site.
            </p> */}
          </div>
          <Separator />
          <div className="max-w-[600px] w-full justify-center items-center">
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

              <Controller
                control={form.control}
                name="orgId"
                render={({ field }) => (
                  <div className="space-y-3">
                    <FormLabel>Organisation</FormLabel>
                    <Select
                      {...field}
                      onChange={
                        field.onChange as unknown as (value: any) => void
                      }
                      maxMenuHeight={150}
                      options={AcademicOrganisations?.map(
                        (item: { id: any; name: any }) => ({
                          value: item.id,
                          label: item.name,
                        })
                      )}
                      className="!w-full"
                    />
                    <FormMessage />
                  </div>
                )}
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
      </div>
    </div>
  );
}

export default InviteOrganisation;
