# Custom Routes Example

## Usage
Clone this repository:
```
git clone https://github.com/traveloka/soya-next.git
cd soya-next/examples/custom-routes
```

Install and run it:
```
npm install
npm start
```

Open http://localhost:3000 in your browser.

## How It Works
This example uses [express router](http://expressjs.com/en/api.html#express.router) to enable custom routing.

To use it, create a file at `routes.js` with the following:
```js
module.exports = {
  '/path/:param1/:param2': {
    page: '/path/to/custom-page',
  },
};
```

Then, add the following to `server.js`:
```js
const { createRouter } = require('soya-next/server/router');
const routes = require('./routes');

// ...

server.use(createRouter(app, { routes }));

// ...
```
