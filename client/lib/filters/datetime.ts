import moment from 'moment';

/*
Vue.js filter which converts milliseconds since epoch into a date using momentjs

Optionally include additional argument format to specify format, otherwise moment's
"calendar" time https://momentjs.com/docs/#/displaying/calendar-time/

*/
export default function(value: number, format?: string) {
    let m = moment(value);
    if(format)
        return m.format(format);
    else
        return m.calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'MM/DD/YY'
        }) + ' ' + m.format('h:mma');
}

/*
Slightly modified filter of the above, which is more suitable for smaller timescales
*/
export function timeAgo(value: number, curr?: number) {
    let m = moment(value);

    if(!curr) {
        return m.fromNow();
    }
    else {
        return m.from(moment(curr));
    }
}

/*
For showing the exact time without revelance to the current time in mm/dd/yy hh:mma format or so
*/
export function timeAbsolute(value: number, format?: string) {
    let m = moment(value);

    if(!format) {
        return m.format('ddd MMM D \'YY, h:mma');
    }
    else {
        return m.format(format);
    }
}