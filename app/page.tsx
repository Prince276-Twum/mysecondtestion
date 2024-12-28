"use client";
import UserForm from "@/components/userlist/UserForm";
import UserList from "@/components/userlist/UserList";
import { useState } from "react";

interface userType {
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<userType[]>([]);

  const onUserAdd = (user: userType) => {
    setUsers((prev) => [...prev, user]);
  };
  console.log(users);
  return (
    <div>
      <UserForm onUserAdd={onUserAdd} />
      <hr />
      <UserList users={users} />
    </div>
  );
}

export type { userType };
