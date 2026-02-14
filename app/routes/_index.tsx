import { Link, useLoaderData } from 'react-router';

import type { HomePageContent, SocialLink, Post } from '~/cms';
import { cms } from '~/cms';
import { Shape1 } from '~/svgs';
import type { Route } from '../+types/root';

import { AnimatedImage } from '../components/AnimatedImage';

import '~/styles/home.css';

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

// export function links() {
//   return [];
// }

export const meta = ({loaderData}: Route.MetaArgs) => {
  return [
    {
      title: 'Zach Urich',
      description: `${loaderData?.content?.header}. ${loaderData?.content.intro}`,
    },
  ];
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
        <div className="columns">
          <article>
            <h2 id={content.sectionHeader.toLowerCase()}>
              💭 {content.sectionHeader}
            </h2>
            <ul className="home-posts">
              {posts.map((post, index) => {
                return (
                  <li key={post.link} className="home-post card">
                    <Link
                      to={post.link}
                      prefetch={index <= 3 ? 'render' : undefined}
                    >
                      <span className="home-post-title">{post.title}</span>
                      <br></br>
                      <span className="home-post-date">{post.date}</span>
                    </Link>
                    <span className="home-post-excerpt">{post.excerpt}</span>
                  </li>
                );
              })}
            </ul>
          </article>
          <article className="sideBar">
            <h2 id={content.sectionHeader.toLowerCase()}>🔗 links</h2>
            <ul className="card links-list">
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
      </div>
    </>
  );
}
