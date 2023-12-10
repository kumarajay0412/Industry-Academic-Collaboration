import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useGetProjectQuery } from "@/store/auth";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "@/components/ui/button";

function Project() {
  const router = useRouter();
  const { query } = router;
  const { data: projectData, isLoading } = useGetProjectQuery(query.id);
  const showProgressUpdates = projectData && projectData.progressUpdates.length;
  const showIndustryUsers = projectData && projectData.industryUsers.length;
  return (
    <>
      <Header />
      <div className="flex flex-col p-6">
        {isLoading ? (
          <>
            <div className="text-heading2 text-black">
              <Skeleton className="h-4 w-[250px]" />
            </div>
            <div className="text-heading5 text-black mt-2">
              <Skeleton className="h-4 w-[250px]" />
            </div>
            <div className="text-heading2 text-black">
              <Skeleton className="h-12 w-full" />
            </div>
            <div className="flex mt-6 h-48">
              <Skeleton className="w-[350px] h-48" />
              <Skeleton className="w-[350px] h-48 ml-4" />
            </div>
          </>
        ) : (
          <>
            <div className=" flex w-full justify-between">
              <span className="text-heading2 text-black">
                {projectData.title}
              </span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Add Update</Button>
                </DialogTrigger>
                <DialogContent className="w-[50vw]">
                  <DialogHeader>
                    <DialogTitle>Add Progress Update</DialogTitle>
                    <DialogDescription>
                      Maintain your project progress by adding updates here
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col">
                    <Textarea placeholder="Text goes here" rows={5} />
                  </div>

                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            {projectData.startDate && (
              <div className="text-heading5 text-black mt-2">{`Start Date: ${projectData.startDate} - End Date: ${projectData.endDate}`}</div>
            )}
            <div className="text-heading5 text-black mt-4">
              {projectData.summary}
            </div>
            <div className="flex flex-wrap">
              <div className="text-heading5 text-black mt-4">
                Areas of Interest:
              </div>
              {projectData.areaOfInterest?.map((aoi: { title: string }) => {
                return (
                  <Badge
                    key={aoi.title}
                    style={{
                      background: "gray",
                    }}
                  >
                    {aoi.title}
                  </Badge>
                );
              })}
            </div>
            <div className="mt-6">
              <div className="text-heading4 text-black mt-4">
                Affiliated Organization
              </div>
              <div className="flex mt-3">
                <Card className="w-[350px]">
                  <CardHeader>
                    <CardTitle>{projectData.academicOrg.name}</CardTitle>
                    <CardDescription>
                      {projectData.academicOrg.location}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <Badge className="capitalize">
                      Organization Type: {projectData.academicOrg.type}
                    </Badge>
                  </CardFooter>
                </Card>
                {projectData.industryOrg && (
                  <Card className="w-[350px] ml-4">
                    <CardHeader>
                      <CardTitle>{projectData.industryOrg.name}</CardTitle>
                      <CardDescription>
                        {projectData.industryOrg.location}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <Badge className="capitalize">
                        Organization Type: {projectData.industryOrg.type}
                      </Badge>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </div>
            <div className="mt-6">
              <div className="text-heading4 text-black mt-4">
                Affiliated Academic Users
              </div>
              <div className="flex flex-wrap mt-3">
                {projectData.academicUsers?.map(
                  (acadUser: {
                    userId: number;
                    firstName: string;
                    lastName: string;
                    email: string;
                    website: string;
                    department: string;
                  }) => {
                    return (
                      <Card className="w-[350px] mr-3" key={acadUser.email}>
                        <CardHeader>
                          <CardTitle>{`${acadUser.firstName} ${acadUser.lastName}`}</CardTitle>
                          <CardDescription>
                            <div>Email : {acadUser.email}</div>
                            <div>Website : {acadUser.website}</div>
                            <div>Department : {acadUser.department}</div>
                          </CardDescription>
                        </CardHeader>
                        {projectData.academicSupervisorId ===
                          acadUser.userId && (
                          <CardFooter className="flex justify-between">
                            <div className="text-heading6 text-blue-500">
                              Coordinator
                            </div>
                          </CardFooter>
                        )}
                      </Card>
                    );
                  }
                )}
              </div>
            </div>
            {showIndustryUsers ? (
              <div className="mt-6">
                <div className="text-heading4 text-black mt-4">
                  Affiliated Industry Users
                </div>
                <div className="flex flex-wrap mt-3">
                  {projectData.industryUsers?.map(
                    (acadUser: {
                      userId: number;
                      firstName: string;
                      lastName: string;
                      email: string;
                      website: string;
                      department: string;
                    }) => {
                      return (
                        <Card className="w-[350px] mr-3" key={acadUser.email}>
                          <CardHeader>
                            <CardTitle>{`${acadUser.firstName} ${acadUser.lastName}`}</CardTitle>
                            <CardDescription>
                              <div>Email : {acadUser.email}</div>
                              <div>Website : {acadUser.website}</div>
                              <div>Department : {acadUser.department}</div>
                            </CardDescription>
                          </CardHeader>
                          {projectData.industrySupervisorId ===
                            acadUser.userId && (
                            <CardFooter className="flex justify-between">
                              <div className="text-heading6 text-blue-500">
                                Coordinator
                              </div>
                            </CardFooter>
                          )}
                        </Card>
                      );
                    }
                  )}

                  {projectData.industryOrg && (
                    <Card className="w-[350px] ml-4">
                      <CardHeader>
                        <CardTitle>{projectData.industryOrg.name}</CardTitle>
                        <CardDescription>
                          {projectData.industryOrg.location}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <Badge className="capitalize">
                          Organization Type: {projectData.industryOrg.type}
                        </Badge>
                      </CardFooter>
                    </Card>
                  )}
                </div>
              </div>
            ) : null}
            {showProgressUpdates ? (
              <div className="mt-6">
                <div className="text-heading4 text-black mt-4">
                  Progress Update
                </div>
                <div className="flex flex-wrap mt-3">
                  {projectData.progressUpdates?.map((update: string) => {
                    return (
                      <Alert key={update}>
                        <AlertDescription>{update}</AlertDescription>
                      </Alert>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}

export default Project;
