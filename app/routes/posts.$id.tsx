import { type LoaderFunction, type MetaFunction } from 'react-router';
import { Link, useLoaderData } from 'react-router';
import type { PostContent } from '~/cms';

import { cms } from '~/cms';
import { Shape1 } from '~/svgs';
import { RenderContent } from '~/components/Cms';

import '~/styles/posts.css';

type Content = {
  post: PostContent;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<Content | null> => {
  const postId = params.id;
  if (postId) {
    const post = await cms.getPost(postId);
    return {
      post,
    };
  }

  return null;
};

// export function links() {
//   return [];
// }

export const meta = ({ data }: { data: Content }) => {
  return [
    {
      title: `${data.post.title} - zachurich.com`,
      description: data.post.date,
    },
  ];
};

export default function Post() {
  const { post } = useLoaderData<Content>();

  if (!post) return null;

  return (
    <>
      <Shape1 />
      <article className="post">
        <h1 id="page-header">{post.title}</h1>
        <span className="post-date">{post.date}</span>
        <RenderContent content={post.content} />
        <Link className="bottom-link" to="/#writing">
          more posts
        </Link>
      </article>
    </>
  );
}
