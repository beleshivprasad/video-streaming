import PropTypes from "prop-types";

import useToken from "../hooks/useToken";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/common/Loader";

function AuthLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = useToken();

  useEffect(() => {
    if (token) return navigate("/");
    setIsLoading(false);
  }, [navigate, token]);

  return <main className="h-screen">{isLoading ? <Loader /> : { children }}</main>;
}

AuthLayout.propTypes = {
  children: PropTypes.any
};

export default AuthLayout;
