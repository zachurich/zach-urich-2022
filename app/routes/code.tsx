import { type LoaderFunction, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { Shape1 } from '~/svgs';
import { github, GithubRepo } from '~/github';

import { dateFromString } from '../dates';
import { cms, PageContent } from '../cms';

import '~/styles/repos.css';

type LoaderType = {
  content: PageContent;
  repos: GithubRepo[];
};

export function headers() {
  return {
    'cache-control': 'max-age=604800, stale-while-revalidate=86400',
    'Netlify-CDN-Cache-Control': 'max-age=604800, stale-while-revalidate=86400',
  };
}

export const loader: LoaderFunction = async (): Promise<LoaderType> => {
  const repos = (await github.fetchRepos()) ?? [];
  const content = await cms.getGridPageContent('code');

  return {
    content,
    repos,
  };
};

// export function links() {
//   return [];
// }

export const meta: MetaFunction = ({ data }) => {
  // @ts-expect-error
  return [{ title: 'Code - zachurich.com', description: data?.content?.intro }];
};

export default function Drawings() {
  const { content, repos } = useLoaderData<LoaderType>();

  if (!repos) return null;

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
                    {repo.fork ? ' Fork: ' : ''}
                    {repo.name}
                  </a>
                </h2>
                <span className="repo-date">
                  {dateFromString(repo.created_at)}
                </span>
              </div>
              <div className="repo-desc-lang-wrapper">
                <div className="repo-description">
                  {repo.description ?? 'No description 😅'}
                </div>
                {!repo.language ? null : (
                  <div className="repo-language-wrapper">
                    <div className="repo-language pill">{repo.language}</div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
