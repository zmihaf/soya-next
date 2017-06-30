export default ({ method = 'GET', status = 301, ...redirect }) => ({
  method,
  status,
  ...redirect,
});
