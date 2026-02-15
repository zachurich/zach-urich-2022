import { type ActionFunction } from 'react-router';
// import { redisClient } from '../redis';
const redisClient = null; // placeholder until I decide if I want to use redis or not

export const action: ActionFunction = async ({
  request,
}: {
  request: Request;
}) => {
  try {
    const headers = request.headers;

    if (headers.get('X-Password') !== process.env.CACHE_PASS) {
      throw Error('nice try.');
    }

    if (request.method === 'POST') {
      // @ts-expect-error flushall might not exist on redisClient
      const response = await redisClient?.flushall?.();
      if (response !== 'OK') throw Error('redis error');

      return Response.json(
        {
          response: 'busted.',
        },
        { status: 200 }
      );
    } else throw Error('nice try.');
  } catch (err) {
    return Response.json(
      {
        response: 'bust failed. ' + err,
      },
      { status: 500 }
    );
  }
};
