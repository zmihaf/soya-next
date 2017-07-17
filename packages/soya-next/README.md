# Soya Next
Soya Next is a set of utility functions for React applications built on top of Next.js.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Differences from vanilla Next.js](#differences-from-vanilla-nextjs)
- [Quick Start Guide](#quick-start-guide)
- [Documentation](#documentation)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Build your app](#build-your-app)
    - [Start your app](#start-your-app)
  - [API](#api)
- [Examples](#examples)

## Prerequisites
To start using Soya Next, you need to be familiar with the following:

- [React](https://facebook.github.io/react) - A javascript library for building user interfaces
- [Next.js](https://github.com/zeit/next.js) - A minimalistic framework for server-rendered React applications

A little bit of the following:
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Express.js Routing](https://expressjs.com/en/guide/routing.html)

And optionally:

- [Redux](https://github.com/reactjs/redux) - Predictable state container for JavaScript apps

## Differences from vanilla Next.js

- CSS modules already configured. You just need to import CSS with `.mod.css` or `.module.css` suffix from your react component's JS file. You can also use SCSS in CSS module files with `.mod.scss` or `.module.scss` suffix.
- Asset as modules already configured. You can import any images, svg and fonts from your JS and CSS files and it will automatically be resolved to a hashed asset URL.
- Easy application configuration based on environment (see [Node Config](https://github.com/lorenwest/node-config)).
- Universal cookie access already configured using [React Cookie](https://github.com/reactivestack/cookies/tree/master/packages/react-cookie).
- Redux already configured (usage is optional). See Redux example for more information.
- Instead of using `<Link>`, use `<LocaleLink>` (see API for more information). This link component is already locale aware.
- Custom routing supports locale, and redirection for obsolete pages.
- Gzip compression always enabled in production.
- CLI provided for easy setup.

## Quick Start Guide
This is a quick start to help you bootstrap **soya-next** project in no time. It should cover everything in the getting started section.

```
npm install -g soya-next-cli

soya-next-cli app-name
cd app-name
npm start
```

You are done! Open http://localhost:3000 in your browser to see your app running.

## Documentation

### Getting Started

#### Installation
Soya Next requires **Express.js**, **Next.js**, **React**, **React-Cookie**, **React-Redux**, and **Redux** to be installed, run the following to install them:

```
npm install --save express next react react-cookie react-dom react-redux redux
```

To install Soya Next, run the following:

```
npm install --save soya-next
```

#### Configuration
In your project root directory, create `next.config.js` with the following:

```js
const { createNextConfig } = require('soya-next');

module.exports = createNextConfig();
```

This will configure your app to support CSS modules, SASS, image import, and global app configuration. 

#### Build your app
In your project root directory, create `server.js` with the following:

```js
const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const { createRouter } = require('soya-next/server/router');

app.prepare()
  .then(() => {
    const server = express();
    server.use(createRouter(app));
    server.listen(3000, err => {
      if (err) {
        throw err;
      }
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
```

Then, create a directory called `pages` and add `index.js` as a sample page into it with the following:

```js
import Head from 'next/head';
import { createPage } from 'soya-next';

const IndexPage = () => (
  <div>
    <Head><title>Soya Next Project</title></Head>
    <p>This is your project homepage</p>
  </div>
);

export default createPage()(IndexPage);
```

That's it!

#### Start your app

To start your app run the following:

```
node server.js
```

To use `npm start` or `yarn start` instead, add the following to your `package.json`:

```json
{
  "scripts": {
     "start": "node server.js"
  }
}
```

Open http://localhost:3000 in your browser.

### API
You can read the API documentation [here](./API.md#api).
- [`applyReducers([reducers])`](./API.md#applyreducersreducers)
- [`createDocument()`](./API.md#createdocument)
- [`createNextConfig([nextConfig])`](./API.md#createnextconfignextconfig)
- [`createPage([...connectArgs])(Page, [reducers])`](./API.md#createpageconnectargspage-reducers)
- [`createRouter(app, [options])`](./API.md#createrouterapp-options)
- [`withLocale()`](./API.md#withlocale)
- [`<LocaleLink />`](./API.md#localelink-)

## Examples
- Authentication ([source](/examples/auth))
- CSS Modules ([source](/examples/css-modules))
- CSS Modules with SCSS ([source](/examples/css-modules-with-scss))
- Custom Routes ([source](/examples/custom-routes))
- I18n ([source](/examples/i18n))
- I18n with Redux ([source](/examples/i18n-with-redux))
- TodoMVC ([source](/examples/todomvc))
