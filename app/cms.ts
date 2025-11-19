import * as prismic from '@prismicio/client';
import { dateFromString } from '~/dates';

import type { RTNode } from '@prismicio/types';
import { withCache } from './redis';

const endpoint = prismic.getRepositoryEndpoint('zachurichblog');

const client = prismic.createClient(endpoint);

export type ExternalLink = {
  url: string;
  target: '_blank';
};

export type NavItem = {
  id: string;
  to: string;
  text: string;
  external?: boolean;
};

export type Post = {
  title: string;
  link: string;
  date: string;
  excerpt: string;
};

export type SocialLink = {
  linkName: string;
  uri: string;
};

export type ImageDetails = {
  dimensions: Array<unknown>;
  alt: null;
  copyright: null;
  url: string;
};

export type GridImage = {
  url: string;
  title: string;
  description: [RTNode, ...RTNode[]];
};

export type PostContent = {
  title: string;
  content: [RTNode, ...RTNode[]];
  date: string;
};

export type HomePageContent = {
  header: string;
  mePic: string;
  intro: string;
  sectionHeader: string;
};

export type PageContent = {
  header: string;
  intro: string;
  moreLink: ExternalLink;
  images: GridImage[];
};

const getNavigation = async (): Promise<NavItem[] | []> => {
  const data = await client.getAllByType('navigation');
  const navItems = data?.[0]?.data.nav_items || [];

  if (navItems instanceof Array) {
    return navItems?.map((field) => {
      return {
        id: `${data?.[0]?.id}-${field.to}`,
        to: field.to,
        text: field.text,
        external: field.to?.includes('https://'),
      };
    });
  }

  return [];
};

const getPosts = async () => {
  const data = await client.getAllByType('post', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
  });
  return data.map((post) => {
    return {
      title: post.data.title?.[0]?.text,
      link: `/posts/${post.uid}`,
      excerpt:
        post.data.excerpt?.[0]?.text.slice(0, 130).replace('...', '').trim() +
        '...',
      date: dateFromString(post.first_publication_date),
    };
  });
};

const getLinks = async (): Promise<SocialLink[]> => {
  const data = await client.getByType('links', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
  });

  return data?.results?.[0]?.data?.links?.map((link: any) => ({
    linkName: link.link_name[0].text,
    uri: link.uri.url,
  }));
};

const getHome = async (): Promise<HomePageContent> => {
  const data = await client.getByType('home_page');
  const fields = data.results[0].data;
  return {
    header: fields.header[0].text,
    mePic: fields.me_pic.url,
    intro: fields.intro[0].text,
    sectionHeader: fields.section_header[0].text,
  };
};

type GridPageType = 'art' | 'photos' | 'code';

const getGridPageContent = async (
  pageSlug: GridPageType,
): Promise<PageContent> => {
  const data = await client.getAllByType('art');

  const fields =
    data?.find((page) => page?.slugs?.includes(pageSlug))?.data ?? data[0].data;

  return {
    header: fields.header[0].text,
    intro: fields.intro[0].text,
    moreLink: fields.more_link,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images: fields?.images?.map((data: any) => ({
      url: data?.image?.url,
      title: data?.title?.[0]?.text,
      description: data.description,
    })),
  };
};

const getPost = async (postId: string): Promise<PostContent> => {
  const data = await client.getByUID('post', postId);
  return {
    title: data.data.title[0].text,
    content: data.data.body,
    date: dateFromString(data.first_publication_date),
    // previousPost:
  };
};

export const cms = {
  getHome,
  getNavigation,
  getPosts,
  getLinks: getLinks,
  getPost,
  getGridPageContent: getGridPageContent,
};
