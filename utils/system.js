const pm2 = require("pm2");
const packageJson = require("../package.json");
// 通过 pm2 restart wxPA 重启服务
exports.restartServer = () => {
  pm2.connect(function (err) {
    if (err) {
      console.error("PM2 client connection error:", err);
      return;
    }
    console.log("Connected to PM2  pm2.restart");
    pm2.restart(packageJson.name, function (err, data) {
      if (err) {
        console.error("Error restarting process:", err);
      } else {
        console.log("Process restarted successfully:", data);
      }
    });
  });
};
