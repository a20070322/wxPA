const { DelayQueue } = require("../libs/DelayQueue");
const { NodeCron } = require("../libs/NodeCron");
const { DB } = require("../db");
const { botStart } = require("../libs/GeweBot");
const { ProcessEvents } = require("../core/ProcessEvents");
const { cronTaskInit } = require("../core/cronTask");
exports.bootstrap = async (config) => {
  // TODO 此处配置后续抽离
  const { app, router, bot } = await botStart(config);
  const db = new DB(`${bot.getAppId()}.db`);
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
  // 处理事件
  const processEvents = new ProcessEvents(core);
  // 定时任务
  await cronTaskInit(core);
};
