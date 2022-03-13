import { Link, MetaFunction } from 'remix';
import type { PostContent } from '~/cms';

import { LoaderFunction, useLoaderData } from 'remix';
import { cms } from '../cms';
import { Shape1 } from '../svgs';

import styles from '~/styles/posts.css';

type Content = {
  post: PostContent;
};

export const loader: LoaderFunction = async ({ params }): Promise<Content> => {
  const postId = params.id;
  if (postId) {
    const post = await cms.getPost(postId);
    return {
      post,
    };
  }

  return {
    post: { title: 'Not Found', content: 'Missing post...', date: 'Never' },
  };
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: 'zachurich.com' };
};

export default function Index() {
  const { post } = useLoaderData<Content>();

  return (
    <>
      <Shape1 />
      <Link to="/">home</Link>
      <article className="post">
        <h1>{post.title}</h1>
        <span className="post-date">{post.date}</span>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </article>
    </>
  );
}
