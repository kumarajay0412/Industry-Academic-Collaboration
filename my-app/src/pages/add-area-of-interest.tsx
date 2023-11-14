import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import React, { use } from 'react';
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
  useAddAreaOfInterestMutation,
  useGetAreaOfInterestQuery,
} from '@/store/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldComponent from '@/components/TextFieldComponent/TextFieldComponent';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { setStatus } from '@/store/toaster/slice';
import { useDispatch } from '@/store/store';
import { CircularProgress } from '@mui/material';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

function AddOrganisation() {
  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
  });
  const [addAreaOfInterest, { isLoading }] = useAddAreaOfInterestMutation();
  const { data } = useGetAreaOfInterestQuery({});
  const dispatch = useDispatch();

  const form = useForm({
    resolver: yupResolver(validationSchema),
  });
  console.log(data);
  const onSubmit = async (data: any) => {
    const credentials = {
      title: data.title,
      description: data.description,
    };
    try {
      const response = await addAreaOfInterest(credentials).unwrap();
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
            message: 'Area of interest added successfully',
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
            <h3 className="text-lg font-medium">Add Area of Interest</h3>
            {/* <p className="text-sm text-muted-foreground">
              This is how others will see you on the site.
            </p> */}
          </div>
          <Separator />
          <div className="max-w-[600px] w-full justify-center items-center">
            <Form {...form}>
              <div className="flex flex-col"></div>
              <TextFieldComponent
                label="Title"
                type="string"
                name="title"
                placeholder="Enter your Title"
                control={form.control}
                error={form?.formState.errors?.title?.message}
                endIcon={false}
                icon={
                  <div className="absolute !z-[1000] h-[16px] p-[18px]"></div>
                }
              />

              <TextFieldComponent
                label="Description"
                type="string"
                name="description"
                placeholder="Enter Description"
                control={form.control}
                error={form?.formState?.errors?.description?.message}
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
                Add Area of Interest
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
