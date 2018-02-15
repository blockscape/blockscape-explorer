import { Txn } from './txn';

export interface BlockHeader {
    version: number,

    /// The creation time of this block
    timestamp: number,

    /// The shard that this block is intended to be part of, in hex
    shard: string,

    /// The hash of the block prior to this one, in hex
    prev: string,

    /// The merkle root hash of all the transactions, in hex
    merkle_root: string,

    /// The number of blocks which occur before this one in the chain minus 1
    height: number,

    /// The hash of the block header
    hash: string,

    /// The number of transactions found in this block
    txn_count: number
}

export interface Block {
    header: BlockHeader,

    /// All the transactions within this block
    txns: Txn[],

    /// A string describing the current status of the block. Can be one of "Mainchain", "Uncle" for right now
    status: string,

    /// The hash of the block following this one
    next: string,
}