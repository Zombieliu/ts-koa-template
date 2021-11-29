import Router from '@koa/router';

import { Erc20WatchController } from './controller';

export const router = new Router();

const controller = new Erc20WatchController();

router.post('/erc20/watching', controller.getTransfer.bind(controller));
