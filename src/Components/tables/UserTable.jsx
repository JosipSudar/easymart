import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/user").then((res) => {
      setUsers(res.data.users);
    }),
      [];
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Purchases</TableHead>
          <TableHead className="text-right">Time Created</TableHead>
          <TableHead className="text-right">RoleID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users &&
          users.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user._id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.purchases.length}</TableCell>
              <TableCell className="text-right">
                {user.createdAt || "no time created"}
              </TableCell>
              <TableCell className="text-right">{user.role}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
