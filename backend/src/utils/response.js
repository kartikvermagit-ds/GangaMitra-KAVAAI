/**
 * Standard API response helper utilities
 */

const successResponse = (res, data = null, message = 'Success', statusCode = 200) => {
  const payload = {
    success: true,
    message,
  };
  
  if (data !== null && data !== undefined) {
    if (typeof data === 'object' && !Array.isArray(data)) {
      Object.assign(payload, data);
    } else {
      payload.data = data;
    }
  }

  return res.status(statusCode).json(payload);
};

const errorResponse = (res, message = 'An error occurred', statusCode = 500, errors = null) => {
  const payload = {
    success: false,
    message,
  };

  if (errors) {
    payload.errors = errors;
  }

  return res.status(statusCode).json(payload);
};

module.exports = {
  successResponse,
  errorResponse,
};
