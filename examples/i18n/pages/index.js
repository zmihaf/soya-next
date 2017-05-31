import { createPage } from 'soya-next';
import Layout from '../components/Layout';
import data from '../data/i18n.json';

const IndexPage = ({ locale }) => (
  <Layout>
    <h1>{data[locale.language].titleHome}</h1>
    <p>{data[locale.language].contentHome}</p>
  </Layout>
);

export default createPage()(IndexPage);
