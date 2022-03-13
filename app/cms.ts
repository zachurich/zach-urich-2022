/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as prismic from '@prismicio/client';
import * as prismicH from '@prismicio/helpers';
import { dateFromString } from './dates';

const endpoint = prismic.getEndpoint('zachurichblog');

const client = prismic.createClient(endpoint, {
  fetch,
});

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
};

export type PostContent = {
  title: string;
  content: string;
  date: string;
};

export type Home = {
  mePic: string;
  intro: string;
  sectionHeader: string;
};

const getNavigation = async (): Promise<NavItem[] | []> => {
  const data = await client.getAllByType('navigation');
  const navItems = data?.[0]?.data.nav_items || [];

  if (navItems instanceof Array) {
    return navItems?.map((field) => {
      return {
        // @ts-expect-error
        id: `${data?.[0]?.id}-${field.to}`,
        // @ts-expect-error
        to: field.to,
        // @ts-expect-error
        text: field.text,
        // @ts-expect-error
        external: field.to?.includes('https://'),
      };
    });
  }

  return [];
};

const getPosts = async (): Promise<Post[]> => {
  const data = await client.getAllByType('post', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
  });
  return data.map((post) => {
    return {
      // @ts-expect-error
      title: post.data.title?.[0]?.text,
      link: `/posts/${post.uid}`,
      date: dateFromString(post.first_publication_date),
    };
  });
};

const getHome = async (): Promise<Home> => {
  const data = await client.getByType('home_page');
  const fields = data.results[0].data;
  return {
    // @ts-expect-error
    mePic: fields.me_pic.url,
    // @ts-expect-error
    intro: fields.intro[0].text,
    // @ts-expect-error
    sectionHeader: fields.section_header[0].text,
  };
};

const getPost = async (postId: string): Promise<PostContent> => {
  const data = await client.getByUID('post', postId);
  return {
    // @ts-expect-error
    title: data.data.title[0].text,
    // @ts-expect-error
    content: prismicH.asHTML(data.data.body),
    date: dateFromString(data.first_publication_date),
  };
};

export const cms = {
  getHome,
  getNavigation,
  getPosts,
  getPost,
};
