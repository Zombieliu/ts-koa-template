import { Context } from 'koa';

import { encodeAddress } from '@polkadot/util-crypto';

import { ChainStart } from '../../chain/'
import { log } from '../../log';
import { ResponseBody, postAddress } from '../util';

export class BalanceController {
    async postTransfer(ctx: Context): Promise<void> {
        const [to, toExist] = postAddress(ctx.request.body.to);
        if (toExist && to === undefined) {
            ctx.body = ResponseBody.invalidParam('to');
            return;
        }

        const value: bigint = BigInt(ctx.request.body.value);
        if (value === undefined) {
            ctx.body = ResponseBody.invalidParam('value');
            return;
        }


        if (to === undefined || value === undefined) {
            ctx.body = ResponseBody.missingParam('to and value');
            return;
        }
        try {
            ChainStart(encodeAddress(to), value);
            ctx.body = ResponseBody.success({
                result: `Success transfer: ${encodeAddress(to)} get ${value}`
            });
        } catch (error) {
            ResponseBody.internalError();
            log.error(`${ctx.path} error: ${error}`);
        }
    }
}
