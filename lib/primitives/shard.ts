import { u256 } from '.';

export interface ShardInfo {
    id: u256;           /// sha256 identifier for this shard, identified by its generated genesis block
    parent?: u256;      /// sha256 identifier for the parent for this shard
    height: number;     /// the number of levels "deep" in the tree the shard is
    isLeaf: boolean;    /// whether or not this shard has no children
}