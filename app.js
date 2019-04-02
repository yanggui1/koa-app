const koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");

// 实例化koa
const app = new koa();
const router = new Router();

const users = require("./routes/api/users");

// 配置路由地址
router.use("/api/users",users);

const db = require("./config/keys").mongoURI;
console.log(typeof db);
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 路由
router.get("/", async ctx => {
    ctx.body = {msg: "hello koa !"}
})

// 配置路由
app.use(router.routes()).use(router.allowedMethods());
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started on ${port}`);
})