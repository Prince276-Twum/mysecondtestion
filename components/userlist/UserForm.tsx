"use client";
import React, { useState, FormEvent } from "react";

interface userType {
  name: string;
  email: string;
}

interface Props {
  onUserAdd: (user: userType) => void;
}

function UserForm({ onUserAdd }: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onUserAdd({ name, email });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          value={name}
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

      <div>
        <label>Email</label>
        <input
          value={email}
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <button>Add User</button>
    </form>
  );
}

export default UserForm;
