const { getIp } = require("../utils/ip");

class MsgParser {
  core;
  constructor(core) {
    this.core = core;
  }
  /**
   * 命令映射
   */
  commandMap = {
    功能: {
      desc: "获取帮助",
      key: "commandHelp",
    },
    ip: {
      desc: "获取IP",
      key: "commandGetIp",
    },
  };
  async onMessage(msg) {
    const { bot } = this.core;
    if (msg.type() === bot.Message.Type.Text) {
      let text = msg.text();
      // 如果是群聊
      if (msg.isRoom) {
        // TODO 判断房间是否需要执行命令
        const mentionSelf = await msg.mentionSelf();
        // 如果群聊不是@
        if (!mentionSelf) {
          return;
        }
        text = text.split(" ").slice(1).join(" ")
      } else {
        // TODO 判断联系人是否需要执行命令
      }
      // 获取命令
      const command = text.split(" ")[0];
      console.log("获取命令:", command);
      const fn = this.commandMap[command]?.key;
      const args = text.split(" ").slice(1).join(" ");
      if (command && fn) {
        if (!this[fn]) {
          return await msg.say("命令不存在");
        }
        return await this[fn](msg, args);
      }
    }
  }

  async commandHelp(msg) {
    msg.say(
      `服务支持命令:\n${Object.keys(this.commandMap)
        .map((key) => `[${key}] ${this.commandMap[key]["desc"]}`)
        .join("\n")}`
    );
  }
  async commandGetIp(msg) {
    const ip = await getIp();
    msg.say(ip);
  }
}

exports.MsgParser = MsgParser;
