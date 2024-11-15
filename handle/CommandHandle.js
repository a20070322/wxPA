const commands = require("../command");

/**
 * 命令解析器
 */
class CommandHandle {
  core;
  /**
   * 命令映射
   */
  commandMap = {};
  constructor(core) {
    this.core = core;
    // 初始化命令
    commands.forEach((command) => {
      if (command.key && command.commandFn) {
        this.commandMap[command.key] = command;
      }
    });
  }

  /**
   * 消息解析为命令
   * @param {*} msg
   */
  async commandParser(msg) {
    const { bot } = this.core;
    if (msg.type() === bot.Message.Type.Text) {
      let text = msg.text();
      // 如果是群聊
      if (msg.isRoom) {
        const mentionSelf = await msg.mentionSelf();
        // 如果群聊不是@
        if (!mentionSelf) {
          return null;
        }
        console.log("群聊命令:", text);
        text = text.split(" ").slice(1).join(" ");
        console.log("群聊命令解析:", text);
      }
      // 获取命令
      const key = text.split(" ")[0];
      const args = text.split(" ").slice(1).join(" ");
      return {
        key,
        args,
      };
    }
    return null;
  }
  /**
   * 检查权限
   * @returns
   */
  async checkAuth(msg) {
    // TODO 判断房间是否需要执行命令
    // TODO 判断联系人是否需要执行命令
    return true;
  }
  async onMessage(msg) {
    if (!this.checkAuth(msg)) return;
    const data = await this.commandParser(msg);
    if (!data) return;
    const command = this.commandMap[data.key];
    if (command) {
      console.log("执行命令:", data.key, data.args);
      return await command.commandFn(msg, this);
    }
  }
}

module.exports = CommandHandle;
