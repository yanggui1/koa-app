const koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");
const passport = require("koa-passport");

// 实例化koa
const app = new koa();
const router = new Router();

app.use(bodyParser());

const users = require("./routes/api/users");

// 配置路由地址
router.use("/api/users",users);

const db = require("./config/keys").mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// passport初始化
app.use(passport.initialize());
app.use(passport.session());

// 回调到config文件中 passport.js
require("./config/passport")(passport);

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