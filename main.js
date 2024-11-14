const originalExit = process.exit;
process.on("uncaughtException", (err) => {
  // TODO 退出前webhook 推送通知
  console.log("uncaughtException", err);
});
process.exit = async (code = 0) => {
  if (code !== 0) {
    // TODO 退出前webhook 推送通知
  }
  console.log("exit", code);
  originalExit.call(process, code);
};
const { bootstrap } = require("./bootstrap");
const { getConfig } = require("./utils/config");
const main = async () => {
  const config = await getConfig();
  console.log("wxPa config:", config);
  await bootstrap(config);
};
main();
