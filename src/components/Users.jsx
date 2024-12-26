import React from "react";

function Users({ blogs }) {
  const users = new Set(blogs.map((blog) => blog.user.username));
  console.log(new Set(users));
  return <div>Users</div>;
}

export default Users;
