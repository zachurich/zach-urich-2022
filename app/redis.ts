// import Redis from 'ioredis';

// const connectionString = process.env.REDIS_CONNECTION_STRING ?? '';

// const redisClient = new Redis(connectionString);
// const redisClient = {};

// const withCache =
//   <Response, Args = unknown[]>(
//     fn: (...args: Args[]) => Promise<Response>,
//     cacheKey: string,
//     ttl = 86400,
//   ) =>
//   async (...args: Args[]): Promise<Response> => {
//     let dynamicCacheKey = cacheKey;
//     if (cacheKey.includes(':arg') && typeof args[0] === 'string') {
//       dynamicCacheKey = cacheKey.replace(':arg', args[0]);
//     }

//     try {
//       const cache = await redisClient.get(dynamicCacheKey);
//       if (cache) return JSON.parse(cache);
//     } catch (err) {
//       console.log(`Error getting cache for ${dynamicCacheKey}`);
//     }

//     const response = await fn(...args);

//     try {
//       await redisClient.set(
//         dynamicCacheKey,
//         JSON.stringify(response),
//         'EX',
//         ttl,
//       );
//     } catch (err) {
//       console.log(`Error setting cache for ${dynamicCacheKey}`);
//     }

//     return response;
//   };

// export { withCache, redisClient };
