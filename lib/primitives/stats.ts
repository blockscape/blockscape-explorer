import { u256 } from '.';

export interface Statistics {
    net: NetworkStatistics,
    chain: RecordKeeperStatistics
}

export interface NetworkStatistics {
    attached_networks: number,
    connected_peers: number,
    rx: number,
    tx: number,
    avg_latency: number
}

export interface NetworkPeer {
    endpoint: string,
    key: string,
    version: number,
    name: string
}

export interface NetworkPeerInfo {
    network_id: u256,
    peer: NetworkPeer,
    latency: number,
    pending_send: number
}

export interface RecordKeeperStatistics {
    height: number,
    current_block_hash: string,

    pending_txns_count: number,
    pending_txns_size: number
}