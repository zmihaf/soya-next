# Creating an App

To give you a better understanding on creating a React app in Soya Next,
we will create a simple blog post app with the following pages:

- Home
- Posts
- About

One of the rules of good interface design is to strive for consistency.
So, we will start by creating a layout component to have a consistent layout and also to reduce code duplication across all pages.

In your project root directory, add a new file at `components/Layout.js` with the following:

```js
import Link from 'next/link';
import { createPage } from 'soya-next';

export default createPage()(({ children }) => (
  <div>
    <ul>
      <li>
        <Link href="/"><a>Home</a></Link>
      </li>
      <li>
        <Link href="/about"><a>About</a></Link>
      </li>
    </ul>
    {children}
  </div>
));
```

Next, we will use this layout component to create the pages.

Before creating the pages, remember that the routing API is file-system based, which means every `.js` file within `pages` directory will become a route that gets automatically processed and rendered.

To create the home page, add a new file at `pages/index.js` with the following:

```js
import { createPage } from 'soya-next';
import Layout from '../components/Layout';

const PostLink = props => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

export default createPage()(() => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      <PostLink title="Hello Next.js" />
      <PostLink title="Learn Next.js is awesome" />
      <PostLink title="Deploy apps with Zeit" />
    </ul>
  </Layout>
));
```

Next, to create the about page, add another new file at `pages/about.js` with the following:

```js
import { createPage } from 'soya-next';
import Layout from '../components/Layout';

export default createPage()(() => (
  <Layout>
    <p>This is the about page</p>
  </Layout>
));
```

Finally, to create the posts page, add yet another new file at `pages/post.js` with the following:

```js
import { createPage } from 'soya-next';
import Layout from '../components/Layout';

export default createPage()(({ url }) => (
  <Layout>
    <h1>{url.query.title}</h1>
    <p>This is the blog post content.</p>
  </Layout>
));
```

Congratulations! You have finished creating the simple blog post app.

To start the app, run the following:

```bash
npm start
```

Open http://localhost:3000 in your browser to see your app running.
