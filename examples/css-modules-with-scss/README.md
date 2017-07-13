# CSS Modules with SCSS Example

## Usage
Clone this repository:
```
git clone https://github.com/traveloka/soya-next.git
cd soya-next/examples/css-modules-with-scss
```

Install and run it:
```
npm install
npm start
```

Open http://localhost:3000 in your browser.

## How It Works
This example uses [styled-modules](https://github.com/traveloka/styled-modules) to support CSS Modules.

To use styled-modules, you need to customize your webpack configuration in `next.config.js` with the following:
```js
const { createNextConfig } = require('soya-next/server/next-config');

module.exports = createNextConfig();
```

By default all of your SASS and SCSS files are scoped globally.
To make them scoped locally (CSS Modules), you need to suffixed them with `.mod.sass`, `.module.sass`, `.mod.scss` or `.module.scss`.

### Assets
Notice when you import any assets, they will response with **404 Not Found**.
This is because they're not served yet.

To fix it, add the following to `server.js`:
```js
const { createRouter } = require('soya-next/server/router');

// ...

server.use(createRouter(app));

// ...
```

### Server Side Rendering
To avoid [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content), you can do server side rendering by creating a file at `pages/_document.js` with the following:
```js
import { createDocument } from 'soya-next/server/document';

export default createDocument();
```
