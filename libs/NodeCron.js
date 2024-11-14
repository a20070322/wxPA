const cron = require("node-cron");
class NodeCron {
  defaultOptions = {
    scheduled: true,
    timezone: "Asia/Shanghai",
  };
  core = null;
  jobs = [];
  constructor(core) {
    this.core = core;
  }
  createCronJob({ name, schedule, task, config, payload }) {
    config = Object.assign(this.defaultOptions, config);
    const job = cron.schedule(
      schedule,
      async () => {
        const time = new Date().getTime();
        console.log(`cron job ${name} start`);
        try {
          await task(this.core, payload);
          console.log(
            `cron job ${name} end, 耗时 ${
              (new Date().getTime() - time) / 1000
            }s`
          );
        } catch (error) {
          console.log(`cron job ${name} error: `);
          console.log(error);
        }
      },
      config
    );
    job.start();
    this.jobs.push(job);
    return job;
  }
}
exports.NodeCron = NodeCron;
