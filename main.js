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
const config = require("./config");
const main = async () => {
  // setTimeout(() => {
  //   console.log("手动异常");
  //   process.exit(0);
  // }, 5000);
  await bootstrap({
    proxy: "http://10.147.19.18:3000",
    debug: false, // 是否开启调试模式 默认false
    base_api: "http://10.147.19.244:2531/v2/api", //process.env.WEGE_BASE_API_URL, // Gewechat启动后的基础api地址base_api 默认为 `http://本机ip:2531/v2/api`
    file_api: "http://10.147.19.244:2532/download", //process.env.WEGE_FILE_API_URL, // Gewechat启动后的文件api地址base_api 默认为 `http://本机ip:2532/download`,
  });
};
main();
