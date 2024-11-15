const cronTask = require("../cronTask");

exports.cronTaskInit = async (core) => {
  const TASK_MAP = {};
  // 建立任务函数映射
  cronTask.forEach((info) => {
    TASK_MAP[info.name] = info.fn;
  });
  const { db } = core;
  const tasks = await db.table.task.findAll({
    // 1 启动 2 禁用
    status: 1,
  });
  tasks.forEach((task) => {
    task.payload = JSON.parse(task.payload || "{}");
    const taskFn = TASK_MAP[task.taskFn];
    if (taskFn) {
      core.nodeCron.createCronJob({
        ...task,
        task: taskFn,
      });
      console.log(`[task] loaded  ${task.name} `);
    } else {
      console.log(`[task] not found ${task.name} `);
    }
  });
};
