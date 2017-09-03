# Soya Next

[![Greenkeeper badge](https://badges.greenkeeper.io/traveloka/soya-next.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/traveloka/soya-next.svg?branch=master)](https://travis-ci.org/traveloka/soya-next)
[![Coverage Status](https://coveralls.io/repos/github/traveloka/soya-next/badge.svg?branch=master)](https://coveralls.io/github/traveloka/soya-next?branch=master)

> An opinionated configured Next.js framework.

## Packages

Name | Version | Description
---- | ------- | -----------
[soya-next](/docs/packages/soya-next/README.md) | [![NPM Version](https://img.shields.io/npm/v/soya-next.svg?style=flat-square)](https://www.npmjs.com/package/soya-next) | A set of utility functions for React applications built on top of Next.js
[soya-next-cli](/docs/packages/soya-next-cli/README.md) | [![NPM Version](https://img.shields.io/npm/v/soya-next-cli.svg?style=flat-square)](https://www.npmjs.com/package/soya-next-cli) | A CLI to help bootstrap Soya Next projects quickly
[soya-next-scripts](/docs/packages/soya-next-scripts/README.md) | [![NPM Version](https://img.shields.io/npm/v/soya-next-scripts.svg?style=flat-square)](https://www.npmjs.com/package/soya-next-scripts) | A CLI which contains configuration and scripts used by [soya-next-cli](/docs/packages/soya-next-cli/README.md)

## Features

- Assets import
- Custom routing
- CSS Modules
- Gzip compression
- Internationalization
- On-the-fly linting
- Redux (Automatic code splitting)
- SASS/SCSS
- Universal cookie
- Universal runtime environment configuration

## Quick Start Guide

This is a quick start to help you bootstrap **Soya Next** projects in no time.
It should cover everything in the [Getting Started](/docs/getting-started/README.md) section.

```bash
npm install -g soya-next-cli

soya-next-cli path/to/app
cd path/to/app
npm start
```

That's all!
Open http://localhost:3000 in your browser to see your app running.

## API Reference

Read the full API documentation [here](/docs/API.md).

## Examples

- [Authentication](/docs/examples/auth/README.md) ([source](/examples/auth))
- [CSS Modules](/docs/examples/css-modules/README.md) ([source](/examples/css-modules))
- [CSS Modules with SCSS](/docs/examples/css-modules-with-scss/README.md) ([source](/examples/css-modules-with-scss))
- [Custom Routes](/docs/examples/custom-routes/README.md) ([source](/examples/custom-routes))
- [Internationalization](/docs/examples/i18n/README.md) ([source](/examples/i18n))
- [Internationalization with Redux](/docs/examples/i18n-with-redux/README.md) ([source](/examples/i18n-with-redux))
- [Redirection](/docs/examples/redirection/README.md) ([source](/examples/redirection))
- [TodoMVC](/docs/examples/todomvc/README.md) ([source](/examples/todomvc))

## Contributing
Please see the [Contributing Guide](/CONTRIBUTING.md).

## License
[MIT](/LICENSE.md)
