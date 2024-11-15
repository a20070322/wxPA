const { getIp } = require("../utils/ip");
module.exports = {
  key: "ip",
  desc: "获取IP",
  async commandFn(msg, msgParser) {
    const ip = await getIp();
    msg.say(ip);
  },
};
