/*
Vue.js filter which limits the number of characters of a given block/txn hash
*/
export function hash(value: string, size?: number) {
    if(!size) {
        size = 20;
    }

    return value.substr(0, size) + '...';

}