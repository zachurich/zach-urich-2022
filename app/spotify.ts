// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = process.env.SPOTIFY_TOKEN;
const playlistId = process.env.SPOTIFY_PLAYLIST_ID;

type Track = {
  name: string;
  artists: { name: string }[];
};

async function fetchWebApi(
  endpoint: string,
  method: string,
  body: Record<string, unknown>,
) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}

async function getPlaylistTracks() {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(`v1/playlists/${playlistId}/tracks`, 'GET', {}))
    .items as Track[];
}

const topTracks = await getPlaylistTracks();
console.log(
  topTracks?.map(
    ({ name, artists }) =>
      `${name} by ${artists.map((artist) => artist.name).join(', ')}`,
  ),
);
