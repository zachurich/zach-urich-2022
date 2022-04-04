import type { MetaFunction } from 'remix';
import type { HomePageContent, Post } from '~/cms';

import { Link, useLoaderData } from 'remix';
import { cms } from '~/cms';
import { Shape1 } from '~/svgs';

import styles from '~/styles/home.css';
import { AnimatedImage } from '../components/AnimatedImage';

type Content = {
  posts: Post[];
  content: HomePageContent;
};

export const loader = async (): Promise<Content> => {
  const posts = await cms.getPosts();
  const content = await cms.getHome();

  return {
    posts,
    content,
  };
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: 'Homepage - zachurich.com' };
};

export default function Index() {
  const { posts, content } = useLoaderData<Content>();

  return (
    <>
      <Shape1 />
      <div className="page-content home-content">
        <section className="intro">
          <AnimatedImage
            className="intro-pic"
            src={content.mePic}
            width={162}
            height={162}
            alt="Zach Urich"
          />
          <div className="intro-text">
            <h1 id="page-header">{content.header}</h1>
            <p>{content.intro}</p>
          </div>
        </section>
        <article>
          <h2 id={content.sectionHeader.toLowerCase()}>
            {content.sectionHeader}
          </h2>
          <ul className="posts">
            {posts.map((post) => {
              return (
                <li key={post.link} className="post">
                  <Link to={post.link}>
                    <span className="post-title">{post.title}</span>
                    <br></br>
                    <span className="post-date">{post.date}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </article>
      </div>
    </>
  );
}
