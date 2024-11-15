module.exports = {
  key: "help",
  desc: "获取帮助",
  async commandFn(msg, msgParser) {
    msg.say(
      `服务支持命令:\n${Object.keys(this.commandMap)
        .map((key) => `[${key}] ${this.commandMap[key]["desc"]}`)
        .join("\n")}`
    );
  },
};
