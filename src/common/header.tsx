import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

interface Props {
  token: string | null;
}

const Header = ({ token }: Props) => {
  const { setAuthTokens } = useAuth();
  const logOut = () => {
    setAuthTokens();
  };
  console.log(typeof token);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/">
          <a className="navbar-brand">Data Relawan</a>
        </Link>

        {token !== "undefined" ? (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto" />
            <div className="form-inline my-2 my-lg-0">
              <button
                className="btn my-2 my-sm-0"
                type="submit"
                onClick={logOut}
              >
                logout
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </nav>
    </div>
  );
};

export default Header;
