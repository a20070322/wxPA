const { request } = require("../utils/request");

/** 发送IP任务 */
const taskSendIp = async (core, payload) => {
  const { bot } = core;
  const user = await bot.Contact.find({ id: payload.wxid });
  if (!user) {
    console.log("user not found");
    return;
  }
  const { data } = await request("https://ipinfo.io/ip");
  console.log(`get ip: ${data}`);
  user.say(data);
};

exports.cronTaskInit = async (core) => {
  const TASK_MAP = {
    SendIp: taskSendIp,
  };
  const tasks = [
    // 每天晚上八点四十执行任务
    {
      name: "SendIp",
      schedule: "18 17 * * *",
      payload: {
        wxid: "Zzy66666666666666666",
      },
      taskFn: "SendIp1",
    },
  ];

  tasks.forEach((task) => {
    const taskFn = TASK_MAP[task.taskFn];
    if (taskFn) {
      core.nodeCron.createCronJob({
        ...task,
        task: taskFn,
      });
    } else {
      console.log(`[task] ${task.name} not found`);
    }
  });
};
