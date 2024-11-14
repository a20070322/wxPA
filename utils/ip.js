const { request } = require("./request");

exports.getIp = async () => {
  const { data } = await request("https://ipinfo.io/ip");
  console.log(`get ip: ${data}`);
  return data;
};
