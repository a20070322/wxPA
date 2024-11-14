// 因部分功能限制,需要对 mikoshu/gewechaty 进行修改
// 目前基于 a20070322/gewechaty 进行编译，后续会提交pr 至 mikoshu/gewechaty
// const { GeweBot } = require("./gewechaty");
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
