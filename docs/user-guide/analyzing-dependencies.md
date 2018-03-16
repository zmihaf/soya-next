# Analyzing Bundles

Soya Next uses [webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer) to analyze
which modules are bundled into and bloated your app.

To perform bundle analysis, run the following:

```bash
BUNDLE_ANALYZE=both soya-next-scripts build
BUNDLE_ANALYZE=browser soya-next-scripts build
BUNDLE_ANALYZE=server soya-next-scripts build
```
