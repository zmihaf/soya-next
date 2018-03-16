# CSS Modules with SCSS Example

## Usage

Clone this repository:

```bash
git clone https://github.com/traveloka/soya-next.git
cd soya-next/examples/css-modules-with-scss
```

Then, install and run it:

```bash
npm install
npm start
```

Open http://localhost:3000 in your browser.

## How It Works

This example uses [@zeit/next-sass](https://github.com/zeit/next-plugins/tree/master/packages/next-sass) to support CSS Modules.

By default all of your SASS and SCSS files are scoped globally.
To make them scoped locally (CSS Modules),
you need to suffix them with `.mod.sass`, `.module.sass`, `.mod.scss` or `.module.scss`.
