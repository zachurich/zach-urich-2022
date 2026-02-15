import { Link, useLoaderData } from 'react-router';

import type { HomePageContent, SocialLink, Post } from '~/cms';
import { cms } from '~/cms';
import { Shape1 } from '~/svgs';
import type { Route } from './+types/_index';

import { AnimatedImage } from '../components/AnimatedImage';
import type { LatestCommit } from '../github';
import { github } from '../github';

import '~/styles/home.css';
import { ExternalLinkIcon } from 'lucide-react';

type Content = {
  posts: Post[];
  content: HomePageContent;
  links: SocialLink[];
  info: LatestCommit;
};

export const loader = async (): Promise<Content> => {
  const posts = await cms.getPosts();
  const content = await cms.getHome();
  const links = await cms.getLinks();
  const info = await github.fetchLatestCommit();

  return {
    posts,
    content,
    links,
    info,
  };
};

// export function links() {
//   return [];
// }

export const meta = ({ loaderData }: Route.MetaArgs) => {
  return [
    {
      title: 'Zach Urich',
      description: loaderData?.content?.header
        ? `${loaderData.content.header}. ${loaderData.content.intro}`
        : '',
    },
  ];
};

export default function Index() {
  const { posts, content, links: socialLinks, info } = useLoaderData<Content>();

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
            <h2 id={content.sectionHeader.toLowerCase()}>📊 site info</h2>
            <div className="info card">
              <div className="info-item">
                <span>Latest commit</span>
                <a
                  className="pill"
                  href={info.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {info.sha.slice(0, 7)} <ExternalLinkIcon />
                </a>
              </div>
              <div className="info-item">
                <span>Source code</span>
                <a
                  className="pill"
                  href={info.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit <ExternalLinkIcon />
                </a>
              </div>
              <div className="info-item">
                <span>Last Updated</span>
                <span className="pill">{info.date}</span>
              </div>
              {/* <div className="info-item">
                <span>Your Browser</span>
                <span className="pill">{navigator.userAgent}</span>
              </div> */}
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
