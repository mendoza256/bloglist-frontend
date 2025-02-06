import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import usersService from "../services/users";

const User = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => usersService.getOne(id),
  });

  console.log(data, isLoading, error);

  return (
    <div>
      {data && (
        <>
          <h2>{data.name}</h2>
          <h3>added blogs</h3>
          <ul>
            {data.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
    </div>
  );
};

export default User;
