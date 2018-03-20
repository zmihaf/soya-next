const config = require("config");
let basePath;
if (config.basePath) {
  if (typeof config.basePath === "string") {
    basePath = config.basePath;
  } else {
    basePath = config.basePath && config.basePath.test;
  }
}
config.assetPrefix = config.assetPrefix || basePath || "";
config.configOrigin = config.configOrigin || "default";
config.distDir = config.distDir || ".next";
config.useFileSystemPublicRoutes = config.useFileSystemPublicRoutes || true;
config.server = config.server || {};
config.server.host = config.server.host || "0.0.0.0";
config.server.port = config.server.port || 3000;
