import Koa from 'koa';
import path from 'path';
//静态资源中间件
import resource from 'koa-static';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
const app = new Koa();
const host = 'localhost';
const port = 4000;

app.use(conditional());
app.use(etag());
app.use(async (ctx, next) => {
  console.log(ctx);
  ctx.set({
    'Cache-Control': 'max-age=60'
  });
  await next();
});
app.use(resource(path.join(__dirname, './static')));

app.listen(port, () => {
  console.log(`server is listen in ${host}:${port}`);
});
// etag works together with conditional-get
