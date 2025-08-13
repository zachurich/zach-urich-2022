import { type MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import type { HomePageContent, SocialLink, Post } from '~/cms';
import { cms } from '~/cms';
import { Shape1 } from '~/svgs';

import styles from '~/styles/home.css';
import { AnimatedImage } from '../components/AnimatedImage';

type Content = {
  posts: Post[];
  content: HomePageContent;
  links: SocialLink[];
};

export const loader = async (): Promise<Content> => {
  const posts = await cms.getPosts();
  const content = await cms.getHome();
  const links = await cms.getLinks();

  return {
    posts,
    content,
    links,
  };
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: 'Zach Urich',
    description: `${data.content.header}. ${data.content.intro}`,
  };
};

export default function Index() {
  const { posts, content, links: socialLinks } = useLoaderData<Content>();

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
            randomized={false}
            alt="Zach Urich"
          />
          <div className="intro-text">
            <h1 id="page-header">{content.header}</h1>
            <p>{content.intro}</p>
          </div>
        </section>
        <article>
          <h2 id={content.sectionHeader.toLowerCase()}>
            💭 {content.sectionHeader}
          </h2>
          <ul className="posts">
            {posts.map((post) => {
              return (
                <li key={post.link} className="post card">
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
        <article>
          <h2 id={content.sectionHeader.toLowerCase()}>🔗 links</h2>
          <ul className="card">
            {socialLinks.map((link) => (
              <li key={link.uri}>
                <a target="_blank" rel="noopener noreferrer" href={link.uri}>
                  {link.linkName}
                </a>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </>
  );
}
