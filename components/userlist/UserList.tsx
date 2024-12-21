"use client";
import { userType } from "@/app/page";
import { use } from "react";

interface Props {
  users: userType[];
}

function UserList({ users }: Props) {
  const renderedUsers = users.map((user) => {
    return (
      <tr key={user.name}>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>{renderedUsers}</tbody>
    </table>
  );
}

export default UserList;
