import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../../queries/auth";
import { Data } from "../../model/default-responses";
import { useAuth } from "../../context/auth";

const Index = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  const [validateEmail, setValidateEmail] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);

  const [loginUser, { error, loading, data }] = useMutation<{
    loginUser: Data;
  }>(LOGIN_USER, {
    variables: {
      email: email,
      password: password,
    },
  });

  useEffect(() => {
    if (data?.loginUser) {
      if (data.loginUser.toString() == "NO_USER_WITH_EMAIL") {
        setValidateEmail(true);
      } else if (data.loginUser.toString() == "INCORRECT_PASSWORD") {
        setValidatePassword(true);
      } else {
        setAuthTokens(data.loginUser);
        setLoggedIn(true);
        console.log(data.loginUser);
      }
    }
  }, [data]);

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  const resetState = () => {
    setValidateEmail(false);
    setValidatePassword(false);
  };

  return (
    <div>
      <div className="container p-5 w-25 p-3">
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
          {validateEmail && <p className="text-danger">check your email</p>}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          {validatePassword && (
            <p className="text-danger">check your password</p>
          )}
        </div>
        <div className="text-right mt-4">
          <button
            className="btn btn-primary"
            onClick={() => [resetState(), loginUser()]}
          >
            login
          </button>
          <Link to="/register">
            <p>Don't have an account?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
