const instaApiBase = 'https://graph.instagram.com';

const fields = 'media_type,media_url,permalink,caption';

const drawingProfileId = '17841401745043245';

// const refreshEndpoint = `${instaApiBase}/refresh_access_token?grant_type=ig_refresh_token`;

const mediaEndpointDrawings = `${instaApiBase}/${drawingProfileId}/media?fields=${fields}`;

// TODO: implement refresh token logic and prob store long-lived token in a Dynamo DB table
// const refreshToken = async (currentToken = process.env.INSTA_ACCESS_TOKEN) => {
//   const response = await fetch(
//     `${refreshEndpoint}&access_token=${currentToken}`,
//   );

//   const data = await response.json();

//   return data.access_token;
// };

export type InstaResponse = {
  media_type: string;
  media_url: string;
  id: string;
  caption: string;
  permalink: string;
};

const getDrawings = async (): Promise<InstaResponse[]> => {
  const token = process.env.INSTA_ACCESS_TOKEN;

  // if (tokenExpired) {
  //   token = await refreshToken();
  // }

  const response = await fetch(
    `${mediaEndpointDrawings}&access_token=${token}`,
  );

  const json = await response.json();

  return json.data;
};

export const instagram = {
  getDrawings,
};
