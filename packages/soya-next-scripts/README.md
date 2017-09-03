# Soya Next Scripts

[![NPM Version](https://img.shields.io/npm/v/soya-next-scripts.svg?style=flat-square)](https://www.npmjs.com/package/soya-next-scripts)

> A CLI which contains configuration and scripts used by [soya-next-cli](../soya-next-cli).

## Installation

To install it, run the following:

```bash
npm install --save soya-next-scripts
```

> Note: If you're starting a new project, consider using [soya-next-cli](../soya-next-cli) instead for easier setup.

## Usage

To start your server, run the following:

```bash
soya-next-scripts start
```

To build for production, run the following:

```bash
soya-next-scripts build
```

To analyze output bundles, run the following:

```bash
ANALYZE=1 soya-next-scripts build
```

To run unit tests, run the following:

```bash
soya-next-scripts test
```

To eject configuration and scripts, run the following:

```bash
soya-next-scripts eject
```

> Warning: Eject is permanent, so once it's ejected there's no going back. Use it carefully.
