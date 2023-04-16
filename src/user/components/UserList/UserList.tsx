import { useQuery } from "react-query";
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
import { Spinner } from "../../../shared/components/Spinner/Spinner";

export interface Props {}

export const UserList = () => {
  const { findAll } = useUserService();
  const { isLoading, error, data } = useQuery<User[], Error>("users", findAll);

  if (isLoading) return <Spinner />;
  if (error) return <div>An error has occurred: " + {error.message}</div>;
  return data ? (
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
          {data.map((user, index) => (
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
  ) : null;
};
