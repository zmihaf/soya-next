import { createPage } from 'soya-next';
import { localeShape } from 'soya-next/prop-types';
import Layout from '../components/Layout';
import Dictionary from '../components/Dictionary';

const AboutPage = ({ locale }) => (
  <Layout>
    <Dictionary component='h1' entryKey='titleAboutUs' />
    <Dictionary component='p' entryKey='contentAboutUs' />
  </Layout>
);

AboutPage.propTypes = {
  locale: localeShape.isRequired,
};

export default createPage()(AboutPage);
