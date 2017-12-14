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