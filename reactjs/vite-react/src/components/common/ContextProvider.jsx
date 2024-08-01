import { createContext } from "react";
import PropTypes from "prop-types";

export const Context = createContext();

function ContextProvider({ children, initialState }) {
  return <Context.Provider value={initialState}>{children}</Context.Provider>;
}

ContextProvider.propTypes = {
  children: PropTypes.any,
  initialState: PropTypes.object.isRequired
};

export default ContextProvider;
