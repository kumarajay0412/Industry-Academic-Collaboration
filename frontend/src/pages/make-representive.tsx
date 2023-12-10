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
  useGetUsersMutation,
  useMakeRepresentativeMutation,
  useUnverifiedUsersQuery,
  useUserDetailsQuery,
  useVerifiedUsersQuery,
} from '@/store/auth';
import { useDispatch } from '@/store/store';
import { setStatus } from '@/store/toaster/slice';

function Index() {
  const [data, setData] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [role, setRole] = useState('');
  const [makeRepresentative, { isLoading }] = useMakeRepresentativeMutation();
  const [getUsers] = useGetUsersMutation();
  const [areaOfInterest, setAreaOfInterest] = useState([]);

  const [users, setUsers] = useState<any>([]);
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

  const dispatch = useDispatch();

  const handleInviteUser = async () => {
    const selectedUsers = data.filter((item: any) => item.selected);
    const selectedUserIds = selectedUsers.map((item: any) => item.userId);
    const credentials = {
      memberIds: selectedUserIds,
    };
    const response = await makeRepresentative(credentials).unwrap();
    if (response) {
      dispatch(
        setStatus({
          type: 'success',
          message: 'members converted to represenattive succesfully',
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
    const listData = users?.map((item: any) => ({
      ...item,
      selected: false,
    }));

    setData(listData);
  }, [users]);

  return (
    <div>
      <Header />
      <div className=" space-y-6 p-10 pb-16 md:block">
        <div className="space-y-6">
          <div className="w-full flex justify-between">
            <h3 className="text-lg font-medium">Make Representative</h3>

            <Button onClick={() => handleInviteUser()} variant="destructive">
              Make Representative Selected User
            </Button>
          </div>
          <Separator />
        </div>
        <Table className="max-w-[800px]">
          <TableCaption>Make people Org Representative </TableCaption>
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
              <TableHead>Website</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item: any, index: number) => (
              <TableRow key={item.email}>
                <TableCell className="font-medium">
                  <Checkbox
                    checked={item.selected}
                    onCheckedChange={() => handleRowSelect(index)}
                  />
                </TableCell>
                <TableCell className="font-medium !w-[200px]">
                  {item?.firstName} {item?.lastName}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.website}</TableCell>
                <TableCell>{item.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Index;
