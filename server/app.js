const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./router.js')
const cors = require('koa2-cors')
const app = new Koa()
const jwt = require('./jwt')

app.use(bodyParser())

//允许跨域
app.use(cors({
	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
	maxAge: 5,
	credentials: true,
	allowMethods: ['GET', 'POST', 'DELETE'],
	allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Set-Cookie'],
}))

app.use(async (ctx, next) => {
	// if (ctx.url.indexOf('/node/login') == -1 && ctx.url.indexOf('/node/regist') == -1) {
	// 	if (!jwt.checkToken(ctx.cookies.get('NODEYWORK'))) {
	// 		ctx.response.body = {
	// 			auth: 0
	// 		}
  //     return
	// 	}
	// }
	await next()
})

app.use(router)

app.listen(3000, _ => {
	console.log('server is running at http://localhost:3000')
})
