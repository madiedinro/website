const { createServer } = require('http')
const { parse: urlParse } = require('url')
const micro = require('micro')
const redirect = require('micro-redirect')
const next = require('next')
const serve = require('serve-handler')
// const { getRoutes } = require('./routes')
const nextRoutes = require('./next-routes')


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = nextRoutes.getRequestHandler(app)

console.log('nextjs preparing')
const port = process.env.PORT || 4444;
const contentPrefix = '/content';

app.prepare()
  .then(() => {
    console.log('nextjs creating server')
    const server = micro((req, res) => {

      const { pathname, query } = urlParse(req.url, true)
      console.log('request:', { pathname, query })

      // if (pathname.substr(0, contentPrefix.length) == contentPrefix) {
      //   return serve(req, res, {
      //     "cleanUrls": false,
      //     "public": "content"
      //   });

      // }

      if (pathname === '/') {
        redirect(res, 303, '/ru')
        return;
      }

      handler(req, res);
    })

    server.listen(port, (err) => {
      if (err) {
        throw err
      }

      console.log(`> Ready on http://localhost:${port}`)
    })
    // createServer((req, res) => {


    //   if (routes[pathname]) {
    //     console.log('if(routes[pathname]){')
    //     app.render(req, res, pathname, routes[pathname])
    //     return;
    //   }

    //   // if (params === false) {
    //     handle(req, res)
    //     return
    //   // }
    //   // assigning `query` into the params means that we still
    //   // get the query string passed to our application
    //   // i.e. /blog/foo?show-comments=true
    //   // app.render(req, res, '/docs', Object.assign(params, query))
    // })
  })

// nextapp.prepare().then(() => {
//   app
//     .use()
//     .use(handler).listen(3000);
// });
