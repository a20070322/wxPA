const { DelayQueue } = require("../libs/DelayQueue");
const { NodeCron } = require("../libs/NodeCron");
const { DB } = require("../db");
const { botStart } = require("../libs/GeweBot");
const { ProcessEvents } = require("../core/ProcessEvents");
const { cronTaskInit } = require("../core/cronTask");
const { restartServer } = require("../utils/system");
exports.bootstrap = async (config) => {
  const { app, router, bot } = await botStart(config);
  // TODO 此处配置后续抽离
  router.get("/restart", async (ctx) => {
    restartServer();
    ctx.body = "重启中........";
  });
  app.use(router.routes()).use(router.allowedMethods());
  const db = new DB(`${bot.getAppId()}.db`);
  await db.bootstrap();
  const core = {
    app,
    db,
    bot,
    router,
  };
  // 延迟队列
  const delayQueue = new DelayQueue(core);
  // 定时任务
  const nodeCron = new NodeCron(core);
  core.delayQueue = delayQueue;
  core.nodeCron = nodeCron;

  // 定时任务
  await cronTaskInit(core);
  // 处理事件
  const processEvents = new ProcessEvents(core);
  await processEvents.initListenEvent();
};
