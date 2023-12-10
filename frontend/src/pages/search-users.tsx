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
function CreateSupervise() {
  return (
    <div>
      <Header />
      <div className=" space-y-6 p-10 pb-16 md:block">
        <div className="space-y-6">
          <SearchUsers />
        </div>
      </div>
    </div>
  );
}

export default CreateSupervise;
