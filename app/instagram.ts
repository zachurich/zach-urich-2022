import { withCache } from '~/redis';

const instaApiBase = 'https://graph.instagram.com';

const fields = 'media_type,media_url,permalink,caption';

const drawingProfileId = '17841401745043245';
const photoProfileId = '5027776663981722';

// const refreshEndpoint = `${instaApiBase}/refresh_access_token?grant_type=ig_refresh_token`;

const mediaEndpointDrawings = `${instaApiBase}/${drawingProfileId}/media?fields=${fields}`;
const mediaEndpointPhotos = `${instaApiBase}/${photoProfileId}/media?fields=${fields}`;

export type InstaResponse = {
  media_type: string;
  media_url: string;
  id: string;
  caption: string;
  permalink: string;
};

const getDrawings = async (): Promise<InstaResponse[]> => {
  const token = process.env.INSTA_ACCESS_TOKEN_1;

  const response = await fetch(
    `${mediaEndpointDrawings}&access_token=${token}`,
  );

  const json = await response.json();

  return json.data;
};

const getPhotos = async (): Promise<InstaResponse[]> => {
  const token = process.env.INSTA_ACCESS_TOKEN_2;

  const response = await fetch(`${mediaEndpointPhotos}&access_token=${token}`);

  const json = await response.json();

  return json.data;
};

export const instagram = {
  getDrawings: withCache(getDrawings, 'insta_drawings'),
  getPhotos: withCache(getPhotos, 'insta_photos'),
};
