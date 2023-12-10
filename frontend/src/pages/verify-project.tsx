import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import Select from 'react-select';
import { useDispatch } from '@/store/store';

import React, { useEffect, useState } from 'react';
import {
  useAddSuperviseeMutation,
  useGetAreaOfInterestQuery,
  useGetUsersMutation,
  useSendVerificationProjectMutation,
} from '@/store/auth';
import { Button } from '@/components/ui/button';
import { setStatus } from '@/store/toaster/slice';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
enum Role {
  // ADMIN = 'ADMIN',
  INDUSTRY_REP = 'INDUSTRY_REP',
  INDUSTRY_USER = 'INDUSTRY_USER',
  ACADEMIC_REP = 'ACADEMIC_REP',
  ACADEMIC_USER = 'ACADEMIC_USER',
  ACADEMIC_STUDENT = 'ACADEMIC_STUDENT',
}

function ProjectPropsal() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id');
  const [users, setUsers] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState([]);
  const [role, setRole] = useState('');
  const [inviteUsers, { isLoading }] = useAddSuperviseeMutation();
  const [getUsers] = useGetUsersMutation();
  const dispatch = useDispatch();
  const { data: areaOfInterestData } = useGetAreaOfInterestQuery({});
  const [sendVerificationProject] = useSendVerificationProjectMutation();
  const updateUsers = async () => {
    const response = await getUsers({
      query: searchQuery,
      type: role,
      data: areaOfInterest,
    }).unwrap();
    setUsers(JSON.parse(response));
  };

  useEffect(() => {
    updateUsers();
  }, [searchQuery, role, areaOfInterest]);

  const handleAreaofInterestChange = (e: any) => {
    const selectedAreaOfInterest = e?.map((item: any) => item.value);
    setAreaOfInterest(selectedAreaOfInterest);
  };
  const selectOptionsAreaOfInterest = areaOfInterestData?.map((data: any) => ({
    value: data.id, // Assuming you have an 'id' field
    label: data.title,
  }));

  const handleInviteUser = async (item: any) => {
    const credentials = {
      projectId: Number(projectId),
      industryUserId: item?.userId,
      industryOrgId: item?.orgId,
    };

    const response = await sendVerificationProject(credentials).unwrap();

    if (response) {
      dispatch(
        setStatus({
          type: 'success',
          message: 'members invited  to project successfully',
          timeout: 4000,
        })
      );
    } else {
      dispatch(
        setStatus({
          type: 'error',
          message:
            response?.error?.data?.message || 'Request Failed Pls Try Again',
          timeout: 4000,
        })
      );
    }
  };

  return (
    <>
      <Header />
      <div className=" space-y-6 p-10 pb-16 md:block">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">
              Search Users Across Platform{' '}
            </h3>
          </div>
          <Separator />
          <div className="max-w-[600px] w-full justify-center items-center">
            <Input
              className="border-black border-2"
              placeholder="Search Users"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />

            <div className="mt-4 flex flex-col gap-4">
              <Select
                options={[
                  { label: 'Industry Rep', value: Role.INDUSTRY_REP },
                  { label: 'Industry User', value: Role.INDUSTRY_USER },
                  { label: 'Academic Rep', value: Role.ACADEMIC_REP },
                  { label: 'Academic User', value: Role.ACADEMIC_USER },
                  { label: 'Academic Student', value: Role.ACADEMIC_STUDENT },
                ]}
                onChange={(e) => setRole(e?.value as string)}
                placeholder="Select Role"
              />
              <Select
                onChange={handleAreaofInterestChange}
                isMulti
                maxMenuHeight={150}
                options={selectOptionsAreaOfInterest}
                className="!w-full"
              />
            </div>
          </div>
          <Table className="max-w-[1300px] mt-11 border-t-2 ">
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>organization</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users &&
                users?.map((item: any, index: number) => (
                  <TableRow key={item.email}>
                    <TableCell className="font-medium">
                      {item?.firstName} {item?.lastName}
                    </TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item?.organization?.name}</TableCell>
                    <TableCell>{item.website}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleInviteUser(item)}
                        variant="destructive"
                        className="w-full my-2"
                      >
                        Invite
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default ProjectPropsal;
