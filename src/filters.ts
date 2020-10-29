import Vue from 'vue'
import { format } from 'timeago.js'
import { address } from 'thor-devkit'
import BigNumber from 'bignumber.js'

Vue.filter('locale', (value: number) => value.toLocaleString())
Vue.filter('date', (timestamp: number) => new Date(timestamp * 1000).toLocaleString())
Vue.filter('ago', (timestamp: number) => format(timestamp * 1000))
Vue.filter('abbr', (id: string) => {
    if (id.length === 66) {
        return `${id.slice(0, 10)}…${id.slice(58)}`
    } else if (id.length === 42) {
        id = address.toChecksumed(id)
        return `${id.slice(0, 8)}…${id.slice(38)}`
    }
    return id
})
Vue.filter('amount', (val: string) => new BigNumber(val).div('1' + '0'.repeat(18)).toFormat())
Vue.filter('xamount', (val: string) => {
    const bn = new BigNumber(val).div('1' + '0'.repeat(18))
    if (bn.gte(1000 ** 3)) {
        return bn.div(1000 ** 3).toFormat(2) + 'b'
    } else if (bn.gte(1000 ** 2)) {
        return bn.div(1000 ** 2).toFormat(2) + 'm'
    } else if (bn.gte(1000)) {
        return bn.div(1000).toFormat(2) + 'k'
    }
    return bn.toFormat(2)
})

Vue.filter('checksum', (val: string) => {
    try {
        return address.toChecksumed(val)
    } catch {
        return val
    }
})

Vue.filter('usd', (price: number, wei: string) => {
    return new BigNumber(wei).times(price).div('1' + '0'.repeat(18))
        .toFormat(2)
})

