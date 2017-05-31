import { createPage } from 'soya-next';
import Layout from '../components/Layout';
import Dictionary from '../components/Dictionary';

const IndexPage = ({ locale }) => (
  <Layout>
    <Dictionary component='h1' entryKey='titleHome' />
    <Dictionary component='p' entryKey='contentHome' />
  </Layout>
);

export default createPage()(IndexPage);
