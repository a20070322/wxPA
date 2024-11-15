const packageJson = require("./package.json");
module.exports = {
  apps: [
    {
      name: packageJson.name,
      instances: 1,
      script: "main.js",
      autorestart: false,
    },
    // TODO 使用另个端口启动服务作为机器人管理及登录相关
    {
      name: `${packageJson.name}_web`,
      instances: 1,
      script: "web/server.js",
      autorestart: true,
    },
  ],
};
