import { type LoaderFunction, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import type { ArtPageContent, GridImage } from '~/cms';

import { Shape1 } from '~/svgs';
import { github, GithubRepo } from '~/github';

import styles from '~/styles/repos.css';
import { dateFromString } from '../dates';

export const loader: LoaderFunction = async (): Promise<GithubRepo[]> => {
  const repos = await github.fetchRepos();

  return repos ?? [];
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = ({ data }) => {
  return { title: 'Art - zachurich.com', description: data?.content?.intro };
};

export default function Drawings() {
  const repos = useLoaderData<GithubRepo[]>();
  const content = {
    header: 'Code',
    intro: 'A collection of code snippets and projects.',
    moreLink: { url: '/code', target: '_self' },
    images: [
      {
        url: 'https://example.com/image1.jpg',
        title: 'Code Snippet 1',
        description: 'Description of code snippet 1',
      },
    ],
  };

  const drawings = content.images;

  if (!drawings) return null;

  return (
    <>
      <Shape1 />
      <section>
        <h1 id="page-header">{content.header}</h1>
        <p>{content.intro}</p>
      </section>
      <div className="repo-list">
        {repos.map((repo) => {
          return (
            <article key={repo.id} className="repo-card card">
              <div className="repo-title">
                <h2>
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.name}
                  </a>
                </h2>
                <span className="repo-date">
                  {dateFromString(repo.created_at)}
                </span>
              </div>
              <div className="repo-description">
                {repo.description ?? 'No description 😅'}
              </div>
            </article>
          );
        })}
      </div>
      <a
        className="bottom-link"
        href={content.moreLink.url}
        target={content.moreLink.target}
      >
        See more
      </a>
    </>
  );
}
