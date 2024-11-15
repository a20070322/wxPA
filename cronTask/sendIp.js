const { getIp } = require("../utils/ip");
module.exports = {
  name: "SendIp",
  fn: async (core, payload) => {
    const { bot } = core;
    const user = await bot.Contact.find({ id: payload.wxid });
    if (!user) {
      console.log("user not found");
      return;
    }
    const ip = await getIp();
    user.say(ip);
  },
};
