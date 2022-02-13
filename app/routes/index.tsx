import { Link, useLoaderData } from 'remix';
import { cms, Home, Post } from '../cms';
import { Shape1 } from '../svgs';

import type { MetaFunction } from 'remix';

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
  return { title: 'home - zachurich.com' };
};

export default function Index() {
  const { posts, home } = useLoaderData<Content>();

  return (
    <>
      <Shape1 />
      <div className="page-content home-content">
        <div className="intro">
          <img className="intro-pic" src={home.mePic} alt="Zach Urich" />
          <p className="intro-text">{home.intro}</p>
        </div>

        <div>
          <ul>
            {posts.map((post) => {
              return (
                <li key={post.link}>
                  <Link to={post.link}>
                    <span>{post.title}</span>
                    <br></br>
                    <span>{post.date}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
