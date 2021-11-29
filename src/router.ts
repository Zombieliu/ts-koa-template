import Router from '@koa/router';

import { router as homeRouter } from './api/home/router';
import { router as erc20WatchRouter } from './api/erc20Watch/router'
import { router as balanceRouter } from './api/balance/router'

export const router = new Router();

const apiV0Routers = [
  homeRouter,
  erc20WatchRouter,
  balanceRouter,
];

for (const apiRouter of apiV0Routers) {
  router.use('/api', apiRouter.routes(), apiRouter.allowedMethods({ throw: true }));
}
