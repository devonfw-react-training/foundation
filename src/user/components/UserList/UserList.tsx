import { useEffect, useState } from "react";
import { User } from "../../user";
import { useUserService } from "../../services/UserService";

export interface Props {}

export const UserList = () => {
  const { findAll } = useUserService();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    findAll().then((books: User[]) => setUsers(books));
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-12">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Authors</th>
                <th scope="col">Title</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
