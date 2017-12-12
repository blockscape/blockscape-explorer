export interface Mutation {
    /// Is this a contra mutation?
    contra: boolean,
    changes: {
        /// The type of change, either SetValue or AddEvent
        type: string,

        /// Hex of the key being changed
        key: string,

        /// Hex of the new value for the key
        value: string,

        /// Hex of the extra data
        supp: string
    }[]
}

export interface Txn {
    /// Milliseconds since the epoch at which this transaction was dispatched
    timestamp: number,

    /// The type of transaction
    txn_type: number,

    /// Hex of the public key
    pubkey: string,

    /// The changes defined by this transaction
    mutation: Mutation,

    /// The signature of the changes made by the public key, in hex
    signature: ''
}