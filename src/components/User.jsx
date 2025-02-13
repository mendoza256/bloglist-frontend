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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-800">Error loading user data</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{data.name}</h2>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Added blogs</h3>
        {data.blogs.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {data.blogs.map((blog) => (
              <li
                key={blog.id}
                className="py-3 hover:bg-gray-50 transition-colors"
              >
                <a href={`/blogs/${blog.id}`}>
                  <div className="text-indigo-600 hover:text-indigo-800">
                    {blog.title}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No blogs added yet</p>
        )}
      </div>
    </div>
  );
};

export default User;
