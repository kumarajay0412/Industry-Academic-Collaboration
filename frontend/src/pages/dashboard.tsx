import Header from '@/components/Header';
import { MainNav } from '@/components/main-nav';
import { Search } from '@/components/search';
import { UserNav } from '@/components/user-nav';
import {
  useGetProjectListQuery,
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
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
function Dashboard() {
  const { data: user } = useUserDetailsQuery({});
  const { data } = usePotentialCollaboratorsQuery({ id: user?.userId });
  const { data: projectList } = useGetProjectListQuery({});
  const router = useRouter();
  return (
    <div>
      <Header />

      <div className="flex w-full flex-col">
        <div className="w-full ">
          <div className="p-3">
            <h3 className="text-lg font-medium">Projects</h3>
          </div>
          <div className=" grid grid-cols-3 gap-4 mt-4 p-4 ">
            {projectList?.map((item: any) => {
              return (
                <Card key={item?.id}>
                  <CardHeader>
                    <CardTitle>{item?.title}</CardTitle>
                    <CardDescription>Status : {item?.status}</CardDescription>
                    <CardDescription>Website : {item?.website}</CardDescription>
                    <CardDescription>
                      Industry Organisation : {item?.industryOrg?.name}
                    </CardDescription>
                    <CardDescription>
                      Academic Organisation : {item?.academicOrg?.name}
                    </CardDescription>
                    <CardDescription>
                      <Button
                        onClick={() => {
                          router.push(`/project/${item?.id}`);
                        }}
                        variant="destructive"
                      >
                        View Project
                      </Button>
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
        <div className="w-full ">
          <div className="p-3">
            <h3 className="text-lg font-medium">Potential collaborators</h3>
          </div>
          <div className=" grid grid-cols-3 gap-4 mt-4 p-4 ">
            {data?.map((item: any) => {
              return (
                <Card key={item?.userId}>
                  <CardHeader>
                    <CardTitle>
                      {item?.firstName + ' ' + item?.lastName}
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
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
