import { useEffect, useState } from "react";
import { User } from "../../user";
import { useUserService } from "../../services/UserService";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { Spinner } from "../../../shared/components/Sipnner/Spinner";

export interface Props {}

export const UserList = () => {
  const [loading, setLoading] = useState(true);
  const { findAll } = useUserService();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    findAll().then((books: User[]) => {
      setUsers(books);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner />;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow hover key={user.id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
