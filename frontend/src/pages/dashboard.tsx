import Header from '@/components/Header';
import { MainNav } from '@/components/main-nav';
import { Search } from '@/components/search';
import { UserNav } from '@/components/user-nav';
import {
  usePotentialCollaboratorsQuery,
  useUserDetailsQuery,
} from '@/store/auth';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
function dashboard() {
  const { data: user } = useUserDetailsQuery({});
  const { data } = usePotentialCollaboratorsQuery({ id: user?.userId });
  console.log(data);
  return (
    <div>
      <Header />
      <div className="p-3">
        <h3 className="text-lg font-medium">Potential collaborators</h3>
      </div>
      <Separator />

      <div className=" grid grid-cols-3 gap-4 mt-4 p-4">
        {data?.map((item: any) => {
          return (
            <Card>
              <CardHeader>
                <CardTitle>
                  Name : {item?.firstName + ' ' + item?.lastName}
                </CardTitle>
                <CardDescription>email : {item?.email}</CardDescription>
                <CardDescription>Website : {item?.website}</CardDescription>
                <CardDescription>
                  Department : {item?.department}
                </CardDescription>
                <CardDescription>
                  Organisation : {item?.organization?.name}
                </CardDescription>
                <CardDescription>
                  Area of Interest :{' '}
                  {item?.areaOfInterest?.map((item: any) => {
                    return item.title + ', ';
                  })}
                </CardDescription>
              </CardHeader>
              {/* <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter> */}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default dashboard;
