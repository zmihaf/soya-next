export default param => {
  if (typeof param !== "string" || param.length === 0) {
    return param;
  }

  try {
    return decodeURIComponent(param);
  } catch (err) {
    // istanbul ignore else
    if (err instanceof URIError) {
      err.message = `Failed to decode param "${param}"`;
      err.status = err.statusCode = 400;
    }
    throw err;
  }
};
