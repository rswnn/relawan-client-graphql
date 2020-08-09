import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER_USER } from "../../queries/auth";
import { Data } from "../../model/default-responses";

const Index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerUser, { error, loading, data }] = useMutation<{
    registerUser: Data;
  }>(REGISTER_USER, {
    variables: {
      name: name,
      email: email,
      password: password,
    },
  });
  useEffect(() => {
    if (data?.registerUser) {
    }
  }, [data]);

  return (
    <div>
      <div className="container p-5 w-25 p-3">
        <div className="form-group">
          <label htmlFor="exampleInputName1">Full Name</label>
          <input
            name="name"
            placeholder="name"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            className="form-control"
            id="exampleInputName1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            name="email"
            placeholder="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            name="password"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="text-right mt-4">
          <button className="btn btn-primary" onClick={() => registerUser()}>
            Sign Up
          </button>
          <Link to="/login">
            <p>Already have an account?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
