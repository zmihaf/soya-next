# Custom Document

Please refer to [this](https://github.com/zeit/next.js#custom-document) documentation for customizing document.

The document in Soya Next is customized like the following:

```js
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-modules/server';
import htmlescape from 'htmlescape';

const __SOYA_CONFIG__ = { ...require('config') };
// exclude legacy and server config
delete __SOYA_CONFIG__.legacy;
delete __SOYA_CONFIG__.server;

export default class extends Document {
  static displayName = 'SoyaDocument';

  static getInitialProps({ renderPage }) {
    return {
      ...renderPage(),
      styles: flush(),
    };
  }

  render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
                __SOYA_CONFIG__ = ${htmlescape(__SOYA_CONFIG__)}
              `,
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
```