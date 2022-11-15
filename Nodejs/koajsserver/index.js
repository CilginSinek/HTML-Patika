import Koa from 'koa';
import Router from '@koa/router'
const app = new Koa();
const router = new Router();
router
    .get('/', (ctx) => {
        ctx.body = '<h1>Koa Home Page</h1>';
        ctx.status = 200;
    })
    .get('/about', (ctx) => {
        ctx.body = '<h1>Koa About Page</h1>';
        ctx.status = 200;
    })
    .get('/contact', (ctx) => {
        ctx.body = '<h1>Koa Contact Page</h1>';
        ctx.status = 200;
    });
app.use(router.routes()).use(router.allowedMethods());
app.use(async (ctx, next) => {
    if (parseInt(ctx.status) === 404) {
        ctx.status = 404
        ctx.body = "<h2>Page not found 404</h2>";
    }
})
app.listen(3000);