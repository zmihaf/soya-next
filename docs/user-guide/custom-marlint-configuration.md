# Custom Marlint Configuration

## Override default configuration

To override the default configuration, add `eslintConfig` key to `package.json` like the following:

```json
{
  "eslintConfig": {
    "plugins": [
      "security"
    ],
    "rules": {
      "jsx-quotes": [
        "error",
        "prefer-double"
      ],
      "react/jsx-no-bind": "off",
      "react/jsx-handler-names": "off"
    }
  }
}
```

## Use eslintignore

To use `.eslintignore`, add `eslintIgnore` key and set it to `true` in `package.json` like the following:

```json
{
  "eslintIgnore": true
}
```

Please refer to [this](https://eslint.org/docs/user-guide/configuring#ignoring-files-and-directories) documentation for ignoring files and directories.
