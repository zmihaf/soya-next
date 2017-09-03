import { createPage } from 'soya-next';
import Layout from '../components/Layout/Layout';

export default createPage()(({ url }) => (
  <Layout>
    <h1>{url.query.title || url.query.id}</h1>
    <p>This is the blog post content.</p>
  </Layout>
));
