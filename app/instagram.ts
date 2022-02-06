const instaApiBase = 'https://graph.instagram.com';

// const refreshEndpoint = `${instaApiBase}/refresh_access_token?grant_type=ig_refresh_token`;

const mediaEndpointDrawings = `${instaApiBase}/17841401745043245/media?fields=media_type,media_url`;

// TODO: implement refresh token logic and prob store long-lived token in a Dynamo DB table
// const refreshToken = async (currentToken = process.env.INSTA_ACCESS_TOKEN) => {
//   const response = await fetch(
//     `${refreshEndpoint}&access_token=${currentToken}`,
//   );

//   const data = await response.json();

//   return data.access_token;
// };

const getDrawings = async () => {
  const token = process.env.INSTA_ACCESS_TOKEN;

  // if (tokenExpired) {
  //   token = await refreshToken();
  // }

  const response = await fetch(
    `${mediaEndpointDrawings}&access_token=${token}`,
  );

  const data = await response.json();

  console.log(data);
};

export const instagram = {
  getDrawings,
};
