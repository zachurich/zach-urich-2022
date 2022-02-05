/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as prismic from '@prismicio/client';
import * as prismicT from '@prismicio/types';

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

export type Post = {};

export const getNavigation = async (): Promise<NavItem[]> => {
  const data = await client.getAllByType('navigation');
  return data.map((field) => {
    console.log(field.data.text);
    return {
      id: field.id,
      // @ts-expect-error
      to: field.data.to?.url,
      // @ts-expect-error
      text: field.data.text?.[0]?.text,
      // @ts-expect-error
      external: field.data.to?.url?.includes('https://'),
    };
  });
};

export const getPosts = async () => {
  const data = await client.getAllByType('post');
  console.log(data);
  return data.map((field) => {
    return {};
  });
};
