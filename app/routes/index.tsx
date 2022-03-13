import type { MetaFunction } from 'remix';
import type { Home, Post } from '~/cms';

import { Link, useLoaderData } from 'remix';
import { cms } from '../cms';
import { Shape1 } from '../svgs';

import styles from '~/styles/home.css';

type Content = {
  posts: Post[];
  home: Home;
};

export const loader = async (): Promise<Content> => {
  const posts = await cms.getPosts();
  const home = await cms.getHome();

  return {
    posts,
    home,
  };
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: 'zachurich.com' };
};

export default function Index() {
  const { posts, home } = useLoaderData<Content>();

  return (
    <>
      <Shape1 />
      <div className="page-content home-content">
        <section className="intro">
          <img className="intro-pic" src={home.mePic} alt="Zach Urich" />
          <div className="intro-text">
            <h1>hello! i&apos;m zach.</h1>
            <p>{home.intro}</p>
          </div>
        </section>
        <section>
          <h2>{home.sectionHeader}</h2>
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
        </section>
      </div>
    </>
  );
}
