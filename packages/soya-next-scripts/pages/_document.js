import Document from 'next/document';
import flush from 'styled-modules/server';

export default class extends Document {
  static displayName = 'SoyaDocument';

  static getInitialProps({ renderPage }) {
    return {
      ...renderPage(),
      styles: flush(),
    };
  }
}
