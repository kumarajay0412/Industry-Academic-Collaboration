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
  useGetUnVerifiedUsersQuery,
  useGetUsersMutation,
  useUnverifiedUsersQuery,
  useUserDetailsQuery,
  useVerifiedUsersQuery,
  useVerifyUsersMutation,
} from '@/store/auth';
import { useDispatch } from '@/store/store';
import { setStatus } from '@/store/toaster/slice';
import CircularProgress from '@mui/material/CircularProgress';

function Index() {
  const [data, setData] = useState<any>([]);
  const [verifyUsers, { isLoading, error }] = useVerifyUsersMutation();
  // const [getUsers] = useGetUsersMutation();
  const [users, setUsers] = useState<any>([]);
  const [areaOfInterest, setAreaOfInterest] = useState([]);
  const [role, setRole] = useState('');
  const { data: unverifiedUsers } = useGetUnVerifiedUsersQuery({});
  const [searchQuery, setSearchQuery] = useState('');

  // const updateUsers = async () => {
  //   const response = await getUsers({
  //     query: searchQuery,
  //     type: role,
  //     data: areaOfInterest,
  //   }).unwrap();
  //   setUsers(JSON.parse(response));
  // };

  // useEffect(() => {
  //   updateUsers();
  // }, [searchQuery, role, areaOfInterest]);

  const [selectAll, setSelectAll] = useState(false);
  // Function to handle individual row selection
  const dispatch = useDispatch();

  const handleVerifyMembers = async () => {
    const selectedUsers = data.filter((item: any) => item.selected);
    const selectedUserIds = selectedUsers.map((item: any) => item.userId);
    const credentials = {
      memberIds: selectedUserIds,
    };
    const response = await verifyUsers(credentials).unwrap();
    if (response) {
      dispatch(
        setStatus({
          type: 'success',
          message: 'members verified succesfully',
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

  const handleSelectAll = () => {
    const updatedData = data?.map((item: any) => ({
      ...item,
      selected: !selectAll,
    }));
    setData(updatedData);
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (index: any) => {
    const updatedData = [...data];
    updatedData[index].selected = !updatedData[index].selected;
    setSelectAll(updatedData.every((invoice) => invoice.selected));
    setData(updatedData);
  };

  useEffect(() => {
    if (unverifiedUsers) {
      const jsonData = JSON.parse(unverifiedUsers);
      const listData = jsonData?.map((item: any) => ({
        ...item,
        selected: false,
      }));

      setData(listData);
    }
  }, [unverifiedUsers]);
  return (
    <div>
      <Header />
      <div className=" space-y-6 p-10 pb-16 md:block">
        <div className="space-y-6">
          <div className="w-full flex justify-between">
            <h3 className="text-lg font-medium">Verify Users</h3>
            <Button onClick={() => handleVerifyMembers()} variant="destructive">
              Verify Selected User
            </Button>
          </div>
          <Separator />
        </div>
        <Table className="max-w-[1300px] mt-11 border-t-2 ">
          <TableHeader>
            <TableRow>
              <TableHead>
                {' '}
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={() => handleSelectAll()}
                  color="secondary"
                />
              </TableHead>

              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Department</TableHead>
            </TableRow>
          </TableHeader>
          {data && data.length === 0 ? (
            <div className="w-full min-h-[300px] flex justify-center items-center">
              <CircularProgress size={26} style={{ color: '#333333' }} />
            </div>
          ) : (
            <TableBody>
              {data?.map((item: any, index: number) => (
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
                  <TableCell>{item.website}</TableCell>
                  <TableCell>{item.department}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}

export default Index;
