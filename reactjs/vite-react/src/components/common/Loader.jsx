import PropTypes from "prop-types";

import { CircularProgress, Typography } from "@mui/material";

function Loader({ label = "" }) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col gap-5 items-center">
        <CircularProgress size={50} />
        {label && <Typography fontSize={18}>{label}</Typography>}
      </div>
    </div>
  );
}

Loader.propTypes = {
  label: PropTypes.string
};

export default Loader;
