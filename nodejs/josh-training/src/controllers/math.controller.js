const { successResponse, errorResponse } = require("../../utils/responseHandler");

const factorial = num => {
  if (num == 0) {
    return 1;
  }

  return num * factorial(num - 1);
};

const getFactorial = async (req, res) => {
  try {
    const num = req.params.number;


    if (isNaN(num)) throw new Error(`${num} is not a number`);

    const val = factorial(num);

    successResponse(res, "success", { factorial: val });
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = {
  getFactorial
};
