import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import Loader from "../components/common/Loader";
import Navbar from "../components/common/Navbar";
import Drawer from "../components/common/Drawer";
import ContextProvider from "../components/common/ContextProvider";

import useToken from "../hooks/useToken";
import { validateToken } from "../services/loginService";

const initialState = { accessToken: null, user: null, isLoggedIn: false };

function AppLayout({ children }) {
  const token = useToken();
  const navigate = useNavigate();

  const [contextState, setContextState] = useState(initialState);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onComponentMount = useCallback(async () => {
    if (!token) {
      console.log("No Token Found. Redirecting to Login...");
      navigate("/login");
    }

    const isTokenValid = await validateToken(token);

    if (!isTokenValid) {
      console.log("Invalid Token. Redirecting to Login...");
      navigate("/login");
    }

    setContextState({
      ...contextState,
      accessToken: token,
      user: { username: "shiv", id: 2 },
      isLoggedIn: true
    });

    setIsLoading(false);
    console.log("Token Validated Successfully.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, token]);

  useEffect(() => {
    onComponentMount();
    console.log("Auth Layout Mount");
  }, [onComponentMount]);

  return (
    <main className="h-screen">
      {
        <ContextProvider initialState={contextState}>
          <nav style={{ height: "10vh" }}>
            <Navbar setIsDrawerOpen={setIsDrawerOpen} />
          </nav>
          <main style={{ height: "90vh" }}>
            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
            {isLoading ? <Loader /> : <>{children}</>}
          </main>
        </ContextProvider>
      }
    </main>
  );
}

AppLayout.propTypes = {
  children: PropTypes.any
};

export default AppLayout;
