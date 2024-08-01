const successResponse = (res, message, data, status = 200) => {
  res.status(status).json({ success: true, status, message, data });
};

const errorResponse = (res, message, error, status = 422) => {
  res.status(status).json({ success: false, status, message, error });
};

module.exports = { successResponse, errorResponse };
