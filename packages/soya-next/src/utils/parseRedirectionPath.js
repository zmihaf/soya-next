import pathToRegexp from "path-to-regexp";

export default (path, params) => pathToRegexp.compile(path)(params);
