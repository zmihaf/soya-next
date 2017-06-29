import Head from 'next/head';
import { createPage } from 'soya-next';

const IndexPage = () => (
  <div>
    <Head><title>Soya Next Project</title></Head>
    <p>This is your project homepage</p>
  </div>
);

export default createPage()(IndexPage);
