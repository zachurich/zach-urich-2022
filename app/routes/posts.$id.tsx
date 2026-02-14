import { Link, useLoaderData } from 'react-router';
import type { PostContent } from '~/cms';

import { cms } from '~/cms';
import { Shape1 } from '~/svgs';
import { RenderContent } from '~/components/Cms';
import type { Route } from './+types/posts.$id';

import '~/styles/posts.css';


type Content = {
  post: PostContent;
};

export const loader = async ({
  params,
}: Route.LoaderArgs): Promise<Content> => {
  const postId = params.id ?? '';
  
  const post = await cms.getPost(postId);
  return {
    post,
  };
};

export const meta = ({ loaderData }: Route.MetaArgs) => {
  if(!loaderData?.post) {
    return [{ title: 'Post not found - zachurich.com' }];
  }
  return [
    {
      title: `${loaderData.post.title} - zachurich.com`,
      description: loaderData.post.date,
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
