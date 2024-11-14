class DelayQueue {
  core = null;
  constructor(core) {
    this.core = core;
    this.queue = []; // 存储任务的队列
    this.interval = null; // setInterval的返回值，用于清除定时器
  }
  // 添加任务到队列
  addTask(delay, task, payload) {
    const taskObj = {
      delay, // 延时时间
      task, // 要执行的任务
      payload: payload || {},
      executeAt: Date.now() + delay, // 任务应该执行的时间
    };
    this.queue.push(taskObj);
    this.queue.sort((a, b) => a.executeAt - b.executeAt); // 按执行时间排序
    this.startInterval(); // 启动定时器，如果尚未启动
  }

  // 执行队列中的任务
  executeTasks() {
    const now = Date.now();
    while (this.queue.length > 0) {
      const taskObj = this.queue[0];
      if (taskObj.executeAt <= now) {
        taskObj.task(this.core, taskObj.payload); // 执行任务
        this.queue.shift(); // 从队列中移除已执行的任务
      } else {
        break; // 如果当前任务尚未到执行时间，则停止执行
      }
    }

    // 如果队列为空，清除定时器
    if (this.queue.length === 0) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  // 启动定时器
  startInterval() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.executeTasks();
      }, 1000); // 每1000毫秒检查一次队列
    }
  }
}

exports.DelayQueue = DelayQueue;
