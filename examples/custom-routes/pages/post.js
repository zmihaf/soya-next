import Layout from '../components/MyLayout.js'

export default (props) => (
    <Layout>
       <h1>{props.url.query.title || props.url.query.id}</h1>
       <p>This is the blog post content.</p>
    </Layout>
)
