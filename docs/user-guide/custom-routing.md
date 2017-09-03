# Custom Routing

> Consider using query string instead before deciding to use custom routing,
> especially when SEO is not a concern.

To use custom route, create a configuration file in `config/default.json` like the following:

```json
{
  "routes": {
    "/path/:any": {
      "page": "/path/to/page"
    },
    "/path/:number(\\d+)": {
      "page": "/path/to/another-page"
    }
  }
}
```

Please refer to the following documentation for:

- [Creating configuration files](universal-environment-configuration.md) 
- [Route path pattern](https://expressjs.com/en/guide/routing.html#route-paths)
