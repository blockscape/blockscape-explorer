/*
Vue.js filters for formatting numbers which mean various sizes with appropriate abbreviations.

For example, "1KB" for a number 1024 when representing a byte size.
*/

export function bytes(value: number) {
    if(value < 512 * 1024) {
        return `${(value / 1024).toFixed(2) } KB`;
    }
    else if(value < 512 * 1024 * 1024) {
        return `${(value / 1024 / 1024).toFixed(2) } MB`;
    }
    else if(value < 512 * 1024 * 1024 * 1024) {
        return `${(value / 1024 / 1024 / 1024).toFixed(2) } GB`;
    }
    else if(value < 512 * 1024 * 1024 * 1024 * 1024) {
        return `${(value / 1024 / 1024 / 1024 * 1024).toFixed(2) } TB`;
    }
}