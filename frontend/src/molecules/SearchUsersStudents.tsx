import React, { useEffect, useState } from 'react';
import {
  useAddSuperviseeMutation,
  useGetAreaOfInterestQuery,
  useGetUsersMutation,
} from '@/store/auth';
import Select from 'react-select';
import { Button } from '@/components/ui/button';
import { setStatus } from '@/store/toaster/slice';
import { useDispatch } from '@/store/store';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
enum Role {
  // ADMIN = 'ADMIN',
  INDUSTRY_REP = 'INDUSTRY_REP',
  INDUSTRY_USER = 'INDUSTRY_USER',
  ACADEMIC_REP = 'ACADEMIC_REP',
  ACADEMIC_USER = 'ACADEMIC_USER',
  ACADEMIC_STUDENT = 'ACADEMIC_STUDENT',
}
function SearchUsers() {
  const [data, setData] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [role, setRole] = useState('');
  const [inviteUsers, { isLoading }] = useAddSuperviseeMutation();
  const [getUsers] = useGetUsersMutation();
  const [areaOfInterest, setAreaOfInterest] = useState([]);
  const [users, setUsers] = useState<any>([]);
  const { data: areaOfInterestData } = useGetAreaOfInterestQuery({});

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
      supervisees: selectedUserIds,
    };
    const response = await inviteUsers(credentials).unwrap();
    if (response) {
      dispatch(
        setStatus({
          type: 'success',
          message: 'members invited successfully',
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

  const handleAreaofInterestChange = (e: any) => {
    const selectedAreaOfInterest = e?.map((item: any) => item.value);
    setAreaOfInterest(selectedAreaOfInterest);
  };
  const selectOptionsAreaOfInterest = areaOfInterestData?.map((data: any) => ({
    value: data.id, // Assuming you have an 'id' field
    label: data.title,
  }));
  return (
    <>
      <div></div>
      <Separator />
      <div className="max-w-[900px] w-full justify-center items-center flex gap-5">
        <Input
          className="border-black border-2 w-[80%]"
          placeholder="Search Users"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <Select
          onChange={handleAreaofInterestChange}
          isMulti
          maxMenuHeight={150}
          options={selectOptionsAreaOfInterest}
          className="!w-full"
        />
        <Button
          onClick={() => handleInviteUser()}
          variant="destructive"
          className=" my-2 w-[40%]"
        >
          Invite Selected Users
        </Button>
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
            <TableHead>organization</TableHead>

            <TableHead>Website</TableHead>
            <TableHead>Department</TableHead>
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
              <TableCell className="font-medium">
                {item?.firstName} {item?.lastName}
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item?.organization?.name}</TableCell>

              <TableCell>{item.website}</TableCell>
              <TableCell>{item.department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default SearchUsers;
