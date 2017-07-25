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

By default all of your SASS and SCSS files are scoped globally.
To make them scoped locally (CSS Modules),
you need to suffixed them with `.mod.sass`, `.module.sass`, `.mod.scss` or `.module.scss`.
