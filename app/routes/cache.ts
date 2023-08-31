import { type ActionFunction, json } from "@remix-run/node";
import { redisClient } from '../redis';

export const action: ActionFunction = async ({
  request,
}: {
  request: Request;
}) => {
  try {
    const body = await request.json();

    if (
      request.method === 'DELETE' &&
      body.password === process.env.CACHE_PASS
    ) {
      const response = await redisClient.flushall();
      if (response !== 'OK') throw Error('redis error');

      return json(
        {
          response: 'busted.',
        },
        200,
      );
    } else throw Error('nice try.');
  } catch (err) {
    return json(
      {
        response: 'bust failed. ' + err,
      },
      500,
    );
  }
};
