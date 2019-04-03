const Router = require("koa-router");
const router = new Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const tools = require("../../config/tools");

/**
 * @route GET api/users/test
 * @description 测试接口地址
 * @access 接口是公开的
 */

router.get("/test", async ctx => {
    ctx.status = 200;
    ctx.body = {msg: "users works ..."};
});


/**
 * @route POST api/users/register
 * @description 注册接口地址
 * @access 接口是公开的
 */

router.post("/register", async ctx => {
    // console.log(ctx.request.body);

    // 存储到数据库
    const findResult = await User.find({email: ctx.request.body.email});
    // console.log(findResult);
    if(findResult.length > 0) {
        ctx.status = 500;
        ctx.body = {email: "邮箱已被占用"};
    }else {
        const avatar = gravatar.url(ctx.request.body.email, {
            s: '200', 
            r: 'pg', 
            d: 'mm'
        });
        const newUser = new User({
            name: ctx.request.body.name,
            email: ctx.request.body.email,
            // password: ctx.request.body.password,
            password: tools.enbcrypt(ctx.request.body.password),
            avatar: avatar
        });

        // await bcrypt.genSalt(10, (err, salt) => {
        //     bcrypt.hash(newUser.password, salt, (err, hash) => {
        //         // Store hash in your password DB.
        //         // console.log(hash);
        //         if (err) {
        //             throw err;
        //         }else {
        //             newUser.password = hash;
        //         }
        //     });
        // });

        // 存储到数据库
        await newUser
            .save()
            .then(user => {
                ctx.body = user;
            })
            .catch((err) => {
                console.log(err);
            });

        
        // 返回json数据
        ctx.body = newUser;
    }
});



/**
 * @route POST api/users/login
 * @description 登陆接口地址 返回token
 * @access 接口是公开的
 */
router.post("/login", async ctx => {
    // 查询
    // ctx.set({"Content-Type": "application/json"});

    const findResult = await User.find({email: ctx.request.body.email});
    const user = findResult[0];
    const password = ctx.request.body.password;
    // 判断用户是否存在
    if (findResult.length == 0) {
        ctx.status = 404;
        ctx.body = {email: "用户不存在!"};
    }else {
        // 若用户存在验证密码
        var result = await bcrypt.compareSync(password, user.password);
        if(result) {
            // 返回token
            ctx.status = 200;
            ctx.body = {success: true};
        }else {
            ctx.status = 400;
            ctx.body = {password: "密码错误!"};
        }
    }

});


module.exports = router.routes();