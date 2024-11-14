// let number = 0;
// // 测试定时任务 每十秒执行一次 第三次抛出异常
// nodeCron.createCronJob({
//   name: "test",
//   schedule: "*/10 * * * * *",
//   payload: {
//     test: "134",
//     test2: "1345",
//   },

const { request } = require("../utils/request");

//   async task(core, payload) {
//     number++;
//     if (number === 3) {
//       throw new Error("test error");
//     }
//     await delay(1000);
//     console.log("test createCronJob");
//   },
// });
// delayQueue.addTask(
//   1000,
//   (core, payload) => {
//     console.log("delay");
//   },
//   { test: "134", test2: "1345" }
// );

const main = async () => {
  const { data } = await request("https://ipinfo.io/ip");
  console.log(data);
};

main()