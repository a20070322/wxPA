const koa = require("koa");
const koaRouter = require("koa-router");
const app = new koa();
const router = new koaRouter();
exports.startServer = (port) => {
  return new Promise((resolve, reject) => {
    app.use(router.routes()).use(router.allowedMethods());
    app.listen(port, (err) => {
      if (err) reject(err);
      resolve(app);
    });
  });
};
