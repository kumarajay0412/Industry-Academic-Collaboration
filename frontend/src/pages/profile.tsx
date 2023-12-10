import Header from '@/components/Header';
import { MainNav } from '@/components/main-nav';
import { ProfileForm } from '@/components/profile-form';
import { Search } from '@/components/search';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserNav } from '@/components/user-nav';
import React, { use, useEffect } from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormLabel, FormMessage } from '@/components/ui/form';
import TextFieldComponent from '@/components/TextFieldComponent/TextFieldComponent';
import Image from 'next/image';
import {
  useEditProfileMutation,
  useGetAreaOfInterestQuery,
  useUserDetailsQuery,
} from '@/store/auth';
import { useDispatch } from '@/store/store';
import { setStatus } from '@/store/toaster/slice';
import CircularProgress from '@mui/material/CircularProgress';
import Select from 'react-select';

function Profile() {
  const [editProfileBoolean, setEditProfileBoolean] = React.useState(false);
  const { data } = useUserDetailsQuery({});
  const [editProfile, { isLoading }] = useEditProfileMutation({});
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    website: yup.string(),
    department: yup.string(),
    areaOfInterest: yup.array(),
  });

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { data: areaOfInterestData } = useGetAreaOfInterestQuery({});

  const selectOptionsAreaOfInterest = areaOfInterestData?.map((data: any) => ({
    value: data.id, // Assuming you have an 'id' field
    label: data.title,
  }));

  const { setValue } = form;

  useEffect(() => {
    setValue('firstName', data?.firstName);
    setValue('lastName', data?.lastName);
    setValue('website', data?.website);
    setValue('department', data?.department);
    setValue('areaOfInterest', data?.areaOfInterest);
  }, [data]);

  const onSubmit = async (data1: any) => {
    const credentials = {
      firstName: data1.firstName,
      lastName: data1.lastName,
      website: data1.website,
      department: data1.department,
      areaOfInterest: data1.areaOfInterest?.map((item: any) => item.value),
    };
    try {
      const response = await editProfile({
        data: credentials,
        id: data?.userId,
      }).unwrap();
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
            message: 'Profile Updated Successfully',
            timeout: 4000,
          })
        );
        setEditProfileBoolean(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />

      <div className=" space-y-6 p-10 pb-16 md:block">
        <div className="space-y-6">
          <div className="flex gap-5 justify-between ">
            <div>
              <h3 className="text-lg font-medium">Profile</h3>
              <p className="text-sm text-muted-foreground">
                This is how others will see you on the site.
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => setEditProfileBoolean(!editProfileBoolean)}
            >
              Edit profile
            </Button>
          </div>

          <Separator />
          <div className="max-w-[600px] w-full justify-center items-center">
            {!editProfileBoolean ? (
              <ProfileForm />
            ) : (
              <Form {...form}>
                {' '}
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
                  label="department Name"
                  type="string"
                  name="department"
                  placeholder="Enter your department name"
                  control={form.control}
                  error={form?.formState?.errors?.department?.message}
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
                  label="website"
                  type="string"
                  name="website"
                  placeholder="Enter your website name"
                  control={form.control}
                  error={form?.formState?.errors?.website?.message}
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
                        className="!w-full !mb-7"
                      />
                      <FormMessage />
                    </div>
                  )}
                />
                <Button
                  className="!w-full normal-case flex gap-4"
                  onClick={form.handleSubmit(onSubmit)}
                  type="submit"
                  form="loginForm"
                  variant="secondary"
                >
                  Update Profile
                  {isLoading && (
                    <CircularProgress size={16} style={{ color: '#333333' }} />
                  )}
                </Button>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
