# Directory Structure

The following are directory structures that you can follow to start creating React application in Soya Next.
The directory structures are not limited to these listed here, so choose whatever that meet your needs.

## Basic

```
  ·
  ├─ components
  │  └─ Layout
  │     ├─ Layout.js
  │     ├─ Layout.module.css
  │     └─ logo.svg
  ├─ config
  │  └─ default.json
  ├─ pages
  │  └─ index.js
  ├─ static
  │  └─ favicon.ico
  ├─ services
  ├─ styles
  │  └─ global.css
  └─ package.json
```

With [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver),
you can organize your directory structure like the following:

```
  ·
  ├─ config
  │  └─ default.json
  ├─ pages
  │  └─ index.js
  ├─ src
  │  ├─ components
  │  │  └─ Layout
  │  │     ├─ Layout.js
  │  │     ├─ Layout.module.css
  │  │     └─ logo.svg
  │  ├─ services
  │  └─ styles
  │     └─ global.css
  ├─ static
  │  └─ favicon.ico
  └─ package.json
```

## Redux

### Rails-style

```diff
  ·
+ ├─ actions
  ├─ components
  │  └─ Layout
  │     ├─ Layout.js
  │     ├─ Layout.module.css
  │     └─ logo.svg
  ├─ config
  │  └─ default.json
+ ├─ constants
+ ├─ containers
  ├─ pages
  │  └─ index.js
+ ├─ reducers
  ├─ static
  │  └─ favicon.ico
  ├─ services
  ├─ styles
  │  └─ global.css
  └─ package.json
```

### Domain-style (per domain or feature)

```diff
  ·
  ├─ actions
  ├─ components
  │  └─ Layout
  │     ├─ Layout.js
  │     ├─ Layout.module.css
  │     └─ logo.svg
  ├─ config
  │  └─ default.json
  ├─ constants
  ├─ containers
+ ├─ domains
+ │  └─ flight
+ │     ├─ actions
+ │     ├─ components
+ │     ├─ constants
+ │     ├─ containers
+ │     ├─ reducers
+ │     ├─ services
+ │     └─ styles
  ├─ pages
+ │  ├─ flight
+ │  │  └─ index.js
  │  └─ index.js
  ├─ reducers
  ├─ static
+ │  ├─ flight
+ │  │  └─ airline.svg
  │  └─ favicon.ico
  ├─ services
  ├─ styles
  │  └─ global.css
  └─ package.json
```
