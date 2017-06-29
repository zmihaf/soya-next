import Document from 'next/document';
import flush from 'styled-modules/server';

class SoyaDocument extends Document {
  static getInitialProps({ renderPage }) {
    return {
      ...renderPage(),
      styles: flush(),
    };
  }
}

export default SoyaDocument;
