const router = require('koa-router')();
const mysqlUtil = require('./mysqlUtil');
const Util = require('./util');
const jwt = require('./jwt');

Object.prototype.parseSqlResult = function() {
	return JSON.parse(JSON.stringify(this))
}

const login = async (ctx, next) => {
	let res = {},
		sql = 'select * from username where account=? && password=?';
	let sqlRes = await mysqlUtil.execQuery({
		sql: sql,
		args: [ctx.query.account, ctx.query.password]
	});
	let r = sqlRes.parseSqlResult();
	console.log(r);
	if (r.length > 0) {
		// if(ctx.query.account == 'admin' && ctx.query.password == '123456'){
		res = {
			errcode: 0,
			errmsg: '成功'
		}
		let token = jwt.getToken(r[0].account);
		//设置登录信息cookie
		ctx.cookies.set('NODEYWORK', token, {
			maxAge: 10 * 60 * 1000, // cookie有效时长
			httpOnly: false, // 是否只用于http请求中获取
			overwrite: false // 是否允许重写
		});
	} else {
		res = {
			errcode: -1,
			errmsg: '用户名或密码错误'
		}
	}
	ctx.response.body = res;
}

const regist = async (ctx, next) => {
	let res = {},
		sql = 'insert into username values(?,?,?,?,?)';
	let sqlRes = await mysqlUtil.execQuery({
		sql: sql,
		args: [ctx.request.body.account, ctx.request.body.password, ctx.request.body.name, ctx.request.body.sex, ctx.request.body.phone]
	});
	console.log(sqlRes);
	if (sqlRes.affectedRows > 0) {
		res = {
			errcode: 0,
			errmsg: '成功'
		}
	} else {
		res = {
			errcode: -1,
			errmsg: '用户名或密码错误'
		}
	}
	ctx.response.body = res;
}

router.get('/node/login', login);

router.post('/node/regist', regist);

module.exports = router.routes();
