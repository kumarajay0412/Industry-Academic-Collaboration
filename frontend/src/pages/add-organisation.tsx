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
import { useAddOrganisationMutation, useSetOrgRepMutation } from '@/store/auth';
import { setStatus } from '@/store/toaster/slice';
import { useDispatch } from '@/store/store';
import { CircularProgress } from '@mui/material';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

function AddOrganisation() {
  const validationSchema = yup.object().shape({
    name: yup.string().required('Organisation is required'),
    type: yup.string().required('Please select org type '),
    location: yup.string().required('Location is required'),
  });
  const [addOrganisation, { isLoading }] = useAddOrganisationMutation();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    const credentials = {
      name: data.name,
      type: data.type,
      location: data.location,
    };
    try {
      const response = await addOrganisation(credentials).unwrap();
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
                label="Org Name"
                type="string"
                name="name"
                placeholder="Enter your name"
                control={form.control}
                error={form?.formState.errors?.name?.message}
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

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3 mb-4">
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex  space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="ACADEMIC" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Academic Institute
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="INDUSTRY" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Industry
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <TextFieldComponent
                label="Location"
                type="string"
                name="location"
                placeholder="Enter Location"
                control={form.control}
                error={form?.formState?.errors?.location?.message}
                endIcon={false}
                icon={
                  <div className="absolute !z-[1000] h-[16px] p-[18px]"></div>
                }
              />

              <Button
                className="!w-full normal-case flex gap-4 mt-4"
                onClick={form.handleSubmit(onSubmit)}
                type="submit"
                form="loginForm"
                variant="secondary"
              >
                Add Organisation
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

export default AddOrganisation;
