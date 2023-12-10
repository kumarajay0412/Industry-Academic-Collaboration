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
import {
  useCreateDraftProjectMutation,
  useGetAcademicOrganisationQuery,
  useGetAreaOfInterestQuery,
  useSendVerificationProjectMutation,
} from '@/store/auth';
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
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

function ProjectPropsal() {
  const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    summary: yup.string().required('Summary is required'),
    startdate: yup.string().required('Start Date is required'),
    enddate: yup.string().required('End Date is required'),
    projectProposalLink: yup
      .string()
      .required('Project Proposal Link is required'),
    areaOfInterest: yup.array(),
  });
  const form = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [createDraftProject, { isLoading, isSuccess }] =
    useCreateDraftProjectMutation();
  const { data: areaOfInterestData } = useGetAreaOfInterestQuery({});

  const [sendVerificationProject] = useSendVerificationProjectMutation();
  const selectOptionsAreaOfInterest = areaOfInterestData?.map((data: any) => ({
    value: data.id, // Assuming you have an 'id' field
    label: data.title,
  }));

  const { control } = form;
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    const credentials = {
      title: data.title,
      summary: data.summary,
      startDate: data.startdate,
      endDate: data.enddate,
      areasOfInterest: data.areaOfInterest?.map((item: any) => item.value),
      projectProposalLink: data.projectProposalLink,
    };
    try {
      const response = await createDraftProject(credentials).unwrap();
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
            message: 'project draft created Successful',
            timeout: 4000,
          })
        );
        console.log(response);
        const json = JSON.parse(response);

        router.push(`/verify-project?id=${json?.id}`);
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
          <Separator />
          <div className="max-w-[600px] w-full justify-center items-center">
            <Form {...form}>
              <div className="flex flex-col"></div>
              <TextFieldComponent
                label="Title"
                type="string"
                name="title"
                placeholder="Enter Title"
                control={form.control}
                error={form?.formState.errors?.title?.message}
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
                control={control}
                name={'summary'}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    name="summary"
                    placeholder="Enter Summary"
                  />
                )}
              />
              <TextFieldComponent
                label="proposal link"
                type="string"
                name="projectProposalLink"
                placeholder="Enter link"
                control={form.control}
                error={form?.formState?.errors?.projectProposalLink?.message}
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
                name="startdate"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-4">
                    <FormLabel>Project Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant={'outline'}>
                            {field.value ? (
                              format(field.value as any, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value as any}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enddate"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-4">
                    <FormLabel>Project End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant={'outline'}>
                            {field.value ? (
                              format(field.value as any, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value as any}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
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
                      className="!w-full !mb-7"
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
                Create Project Draft
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

export default ProjectPropsal;
