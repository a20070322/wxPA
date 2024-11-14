const {
  GeweBot,
} = require("/Users/zhaozhongyang/Desktop/gewe/gewechaty/dist/index.js");

exports.botStart = async (config) => {
  const bot = new GeweBot(config);
  const { app, router } = await bot.start();
  return { app, router, bot };
};
