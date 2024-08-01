const redis = require("redis");

const redisClient = redis.createClient();

redisClient.on("error", error => {
  console.log(`[server]: redis client error`, error.message);
});

redisClient
  .connect()
  .then(() => {
    console.log("[server]: redis client connection success");
  })
  .catch(error => {
    console.log(`[server]: redis client connection error`, error.message);
  });

module.exports = redisClient;
