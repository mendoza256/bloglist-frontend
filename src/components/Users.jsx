import React from "react";
import { useQuery } from "@tanstack/react-query";
import usersService from "../services/users";

function Users() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: usersService.getAll,
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
  });

  return (
    <div style={{ margin: "20px 0" }}>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <strong>Blogs created</strong>
            </th>
          </tr>
        </thead>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error</p>}
        {users && (
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <a href={`/users/${user.id}`}>{user.name}</a>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default Users;
