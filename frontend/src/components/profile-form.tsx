'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useUserDetailsQuery } from '@/store/auth';

export function ProfileForm() {
  const { data } = useUserDetailsQuery({});

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label htmlFor="terms">Your ROLE</Label>
        <div className=" uppercase text-lg">{data?.role}</div>
      </div>

      <div>
        <Label htmlFor="terms">Name</Label>
        <div className=" uppercase text-lg">
          {data?.firstName} {data?.lastName}
        </div>
      </div>
      <div>
        <Label htmlFor="terms">Email</Label>
        <div className="  text-lg">
          {data?.email === null ? 'NA' : data?.email}
        </div>
      </div>

      <div>
        <Label htmlFor="terms">Website</Label>
        <div className="  text-lg">
          {data?.website === null ? 'NA' : data?.website}
        </div>
      </div>
      <div>
        <Label htmlFor="terms">Department</Label>
        <div className="  text-lg">
          {data?.department === null ? 'NA' : data?.department}
        </div>
      </div>
      <div>
        <Label htmlFor="terms">Organization</Label>
        <div className="  text-lg">{data?.organization?.name}</div>
      </div>
      <div>
        <Label htmlFor="terms">Organization Location</Label>
        <div className="  text-lg">{data?.organization?.location}</div>
      </div>
      <div>
        <Label htmlFor="terms">Organization Type</Label>
        <div className="  text-lg">{data?.organization?.type}</div>
      </div>
      <div>
        <Label htmlFor="terms">Area of Interest </Label>
        <div className="  text-lg">
          {data?.areaOfInterest?.map((item: any) => {
            return item.title + ', ';
          })}
        </div>
      </div>
    </div>
  );
}
