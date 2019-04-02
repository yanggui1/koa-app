const Router = require("koa-router");
const router = new Router();
const User = require("../../models/User");

/**
 * @route GET api/users/test
 * @description 测试接口地址
 * @access 接口是公开的
 */

router.get("/test", async ctx => {
    ctx.status = 200;
    ctx.body = {msg: "users works ..."};
})

module.exports = router.routes();