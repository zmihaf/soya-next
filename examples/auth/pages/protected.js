import Head from "next/head";
import { createPage } from "soya-next";
import withAuth from "../HOCs/withAuth";
import Layout from "../components/Layout";

const ProtectedPage = () => (
  <Layout>
    <Head>
      <title>Soya Next Project</title>
    </Head>
    <p>This is your protected page</p>
  </Layout>
);

export default createPage()(withAuth(ProtectedPage));
