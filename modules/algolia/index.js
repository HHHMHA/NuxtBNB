import bodyParser from 'body-parser'
import userRouter from "./routers/users"
import getApis from './apis'

export default function() {
  const algoliaConfig = this.options.privateRuntimeConfig.algolia;
  const apis = getApis(algoliaConfig);

  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use(bodyParser.urlencoded());
    app.use('/api/user', userRouter(apis));
  });
}
