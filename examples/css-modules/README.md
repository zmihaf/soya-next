# CSS Modules Example

## Usage

Clone this repository:

```bash
git clone https://github.com/traveloka/soya-next.git
cd soya-next/examples/css-modules
```

Then, install and run it:

```bash
npm install
npm start
```

Open http://localhost:3000 in your browser.

## How It Works

This example uses [@zeit/next-css](https://github.com/zeit/next-plugins/tree/master/packages/next-css) to support CSS Modules.

By default all of your CSS files are scoped globally.
To make them scoped locally (CSS Modules), you need to suffix them with `.mod.css` or `.module.css`.
