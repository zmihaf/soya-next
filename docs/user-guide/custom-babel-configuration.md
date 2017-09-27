# Custom Babel Configuration

To customize your babel configuration, simply create a `.babelrc` with the desired configuration.
Do not forget to add `next/babel` preset and `styled-modules/babel` plugin into your configuration.

```json
{
  "presets": [
    "next/babel"
  ],
  "plugins": [
    ["styled-modules/babel", {
      "pattern": "\\.(s(a|c)ss|css)$"
    }]
  ]
}
```

Please refer to [this](https://babeljs.io/docs/usage/babelrc/) documentation for customizing babel configuration.
