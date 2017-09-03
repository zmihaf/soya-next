# Custom Routes Example

## Usage

Clone this repository:

```bash
git clone https://github.com/traveloka/soya-next.git
cd soya-next/examples/custom-routes
```

Then, install and run it:

```bash
npm install
npm start
```

Open http://localhost:3000 in your browser.

## How It Works

This example uses [express router](http://expressjs.com/en/api.html#express.router) to enable custom routing.

To use it, create a configuration file at `config/default.json` with the following:

```json
{
  "routes": {
    "/path/:param1/:param2": {
      "page": "/path/to/custom-page"
    }
  }
}
```
