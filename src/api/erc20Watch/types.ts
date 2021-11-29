import { encodeAddress } from '@polkadot/util-crypto';

export class Erc20WatchDetail {
    contractAddr: string;
    extHash: string;
    blockNum: number;
    timestamp: number;
    eventName: string;
    from: string;
    to: string;
    amount: number;
    constructor(
        contractAddr: Uint8Array,
        extHash: string,
        blockNum: number,
        timestamp: number,
        eventName: string,
        from: Uint8Array,
        to: Uint8Array,
        amount: number,
    ) {
        this.contractAddr = encodeAddress(contractAddr);
        this.extHash = extHash;
        this.blockNum = blockNum;
        this.timestamp = timestamp;
        this.eventName = eventName;
        this.from = encodeAddress(from);
        this.to = encodeAddress(to);
        this.amount = amount;
    }
}
