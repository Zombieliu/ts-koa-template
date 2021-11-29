import { Context } from 'koa';
import { log } from '../../log';
import { ResponseBody, postAddress } from '../util';
import { Erc20WatchDetail } from './types'

export class Erc20WatchController {
    async getTransfer(ctx: Context): Promise<void> {
        const timestamp = Date.now()

        const [contractAddr, contractAddrExist] = postAddress(ctx.request.body.contractAddr);
        if (contractAddrExist && contractAddr === undefined) {
            ctx.body = ResponseBody.invalidParam('contractAddr');
            return;
        }

        const extHash = ctx.request.body.extHash;
        if (extHash === undefined) {
            ctx.body = ResponseBody.invalidParam('extHash');
            return;
        }

        const blockNum: number = ctx.request.body.blockNum;
        if (blockNum === undefined) {
            ctx.body = ResponseBody.invalidParam('blockNum');
            return;
        }

        const eventName: string = ctx.request.body.eventName;
        if (eventName === undefined) {
            ctx.body = ResponseBody.invalidParam('eventName');
            return;
        }

        const [from, fromExist] = postAddress(ctx.request.body.from);
        if (fromExist && from === undefined) {
            ctx.body = ResponseBody.invalidParam('from');
            return;
        }
        const [to, toExist] = postAddress(ctx.request.body.to);
        if (toExist && to === undefined) {
            ctx.body = ResponseBody.invalidParam('to');
            return;
        }

        const value: number = ctx.request.body.value;
        if (value === undefined) {
            ctx.body = ResponseBody.invalidParam('value');
            return;
        }


        if (contractAddr === undefined || from === undefined || to === undefined || value === undefined) {
            ctx.body = ResponseBody.missingParam('from and to and value');
            return;
        }

        log.debug(ctx.request.body)
        ctx.body = ResponseBody.success(
            new Erc20WatchDetail(
                contractAddr,
                extHash,
                blockNum,
                timestamp,
                eventName,
                from,
                to,
                value,
            )
        );
    }
}
