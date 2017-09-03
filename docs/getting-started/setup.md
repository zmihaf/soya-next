[soya-next]: https://github.com/traveloka/soya-next/tree/master/packages/soya-next
[soya-next-cli]: https://github.com/traveloka/soya-next/tree/master/packages/soya-next-cli
[soya-next-scripts]: https://github.com/traveloka/soya-next/tree/master/packages/soya-next-scripts

# Setup

## Installation

There are two packages that you need to install:

- [soya-next][soya-next] - A set of utility functions for React applications built on top of Next.js
- [soya-next-scripts][soya-next-scripts] - A CLI which contains configuration and scripts used by [soya-next-cli][soya-next-cli]

Both packages have their own dependencies that need to be installed, run the following to install them:

```bash
npm install --save config next react react-cookie react-dom react-redux redux
```

Then, to install **soya-next** and **soya-next-scripts**, run the following:

```bash
npm install --save soya-next soya-next-scripts
```

## Configuration

You won't need to do any configuration because everything is already configured in [soya-next-scripts](https://github.com/traveloka/soya-next/tree/master/packages/soya-next-scripts).
Simply add the following into your `package.json` scripts section:

```json
{
  "analyze": "ANALYZE=1 soya-next-scripts build",
  "build": "soya-next-scripts build",
  "eject": "soya-next-scripts eject",
  "start": "soya-next-scripts start",
  "test": "soya-next-scripts test"
}
```

You're ready to create your first React application in Soya Next now.
