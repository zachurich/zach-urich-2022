import Redis from 'ioredis';

const connectionString = process.env.REDIS_CONNECTION_STRING ?? '';

const redisClient = new Redis(connectionString);

const withCache =
  <Response>(fn: () => Promise<Response>, cacheKey: string, ttl = 86400) =>
  async (): Promise<Response> => {
    try {
      const cache = await redisClient.get(cacheKey);
      if (cache) return JSON.parse(cache);
    } catch (err) {
      console.log(`Error getting cache for ${cacheKey}`);
    }

    const response = await fn();

    try {
      await redisClient.set(cacheKey, JSON.stringify(response), 'EX', ttl);
    } catch (err) {
      console.log(`Error setting cache for ${cacheKey}`);
    }

    return response;
  };

export { withCache, redisClient };
