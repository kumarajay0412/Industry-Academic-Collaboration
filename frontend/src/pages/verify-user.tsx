import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import React, { use, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  useUnverifiedUsersQuery,
  useUserDetailsQuery,
  useVerifiedUsersQuery,
  useVerifyMembersMutation,
} from '@/store/auth';
import { useDispatch } from '@/store/store';
import { setStatus } from '@/store/toaster/slice';

function Index() {
  const [data, setData] = useState<any>([]);
  const [verifyMembers, { isLoading, error }] = useVerifyMembersMutation();
  const { data: profileData } = useUserDetailsQuery({});

  const { data: AcademicOrganisations } = useUnverifiedUsersQuery(
    profileData?.organization?.id,
    { skip: !profileData?.organization?.id }
  );

  const { data: verifiedUsers } = useVerifiedUsersQuery(
    profileData?.organization?.id,
    { skip: !profileData?.organization?.id }
  );

  useEffect(() => {
    if (AcademicOrganisations?.users) {
      const updatedData = AcademicOrganisations?.users.map((data: any) => ({
        ...data,
        selected: false,
      }));
      setData(updatedData);
    }
  }, [AcademicOrganisations?.users]);

  const [selectAll, setSelectAll] = useState(false);
  // Function to handle individual row selection
  const handleRowSelect = (index: any) => {
    const updatedData = [...data];
    updatedData[index].selected = !updatedData[index].selected;
    setSelectAll(updatedData.every((invoice) => invoice.selected));
    setData(updatedData);
  };
  const dispatch = useDispatch();

  const handleSelectAll = () => {
    const updatedData = data?.map((item: any) => ({
      ...item,
      selected: !selectAll,
    }));
    setData(updatedData);
    setSelectAll(!selectAll);
  };

  const handleVerifyMembers = async () => {
    const selectedUsers = data.filter((item: any) => item.selected);
    const selectedUserIds = selectedUsers.map((item: any) => item.userId);
    const credentials = {
      memberIds: selectedUserIds,
    };

    const response = await verifyMembers({
      data: credentials,
      id: profileData?.organization?.id,
    }).unwrap();
    if (response?.error) {
      dispatch(
        setStatus({
          type: 'success',
          message: 'members verified successfully',
          timeout: 4000,
        })
      );
    } else {
      console.log(response);
    }
  };

  const handleVerifyUser = async (userId: any) => {
    const credentials = {
      memberIds: [userId],
    };

    const response = await verifyMembers({
      data: credentials,
      id: profileData?.organization?.id,
    }).unwrap();

    if (response?.error) {
      console.log(response?.error?.data?.message);
    } else {
      dispatch(
        setStatus({
          type: 'success',
          message: 'member verified successfully',
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
          <div className="w-full flex justify-between">
            <h3 className="text-lg font-medium">Verify Users</h3>
            {selectAll && (
              <Button
                onClick={() => handleVerifyMembers()}
                variant="destructive"
              >
                Verify Selected User
              </Button>
            )}
          </div>
          <Separator />
        </div>
        <Table className="max-w-[800px]">
          <TableCaption>All Unverified Users in your organisation</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={() => handleSelectAll()}
                  color="secondary"
                />
              </TableHead>

              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any, index: number) => (
              <TableRow key={item.email}>
                <TableCell className="font-medium">
                  <Checkbox
                    checked={item.selected}
                    onCheckedChange={() => handleRowSelect(index)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {item?.firstName} {item?.lastName}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() => handleVerifyUser(item.userId)}
                    variant="destructive"
                  >
                    Verify User
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Table className="max-w-[800px] mt-11 border-t-2 ">
          <TableCaption>All Verified Users in your organisation</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {verifiedUsers?.users?.map((item: any, index: number) => (
              <TableRow key={item.email}>
                <TableCell className="font-medium">
                  {item?.firstName} {item?.lastName}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Index;
