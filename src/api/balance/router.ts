import Router from '@koa/router';

import { BalanceController } from './controller';

export const router = new Router();

const controller = new BalanceController();

router.post('/balance/transfer', controller.postTransfer.bind(controller));
