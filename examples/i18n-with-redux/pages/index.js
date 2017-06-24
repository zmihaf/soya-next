import { createPage } from 'soya-next';
import { localeShape } from 'soya-next/prop-types';
import Layout from '../components/Layout';
import Dictionary from '../components/Dictionary';

const IndexPage = ({ locale }) => (
  <Layout>
    <Dictionary component='h1' entryKey='titleHome' />
    <Dictionary component='p' entryKey='contentHome' />
  </Layout>
);

IndexPage.propTypes = {
  locale: localeShape.isRequired,
};

export default createPage()(IndexPage);
