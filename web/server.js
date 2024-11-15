const Koa = require("koa");
const Router = require("koa-router");
const { bodyParser } = require("@koa/bodyparser");
const { getConfig } = require("../utils/config");
const app = new Koa();
const router = new Router();
app.use(bodyParser());
const config = getConfig();

// 定义路由
router.get("/", async (ctx) => {
  ctx.body = "Hello Koa!";
});

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
app.listen(config.webPort, () => {
  console.log(
    `Server running on http://${config.wxpa_host}:${config.webPort}`
  );
});
