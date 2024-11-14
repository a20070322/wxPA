const {
  GeweBot,
} = require("/Users/zhaozhongyang/Desktop/gewe/gewechaty/dist/index.js");

exports.botStart = async (config) => {
  try {
    const bot = new GeweBot(config);
    const { app, router } = await bot.start();
    return { app, router, bot };
  } catch (error) {
    console.log(error);
  }
};
