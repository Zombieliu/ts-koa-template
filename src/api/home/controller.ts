import { BaseContext } from 'koa';

import { log } from '../../log';
import { ResponseBody } from '../util';

export class HomeController {
  async getHello(ctx: BaseContext): Promise<void> {
    ctx.body = ResponseBody.success(
      'hello world',
    );
  }
}
