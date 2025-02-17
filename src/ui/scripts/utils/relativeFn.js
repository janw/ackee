import intervals from '../../../constants/intervals.js'
import relativeDays from './relativeDays.js'
import relativeMonths from './relativeMonths.js'
import relativeYears from './relativeYears.js'

export default (interval) => {
	switch (interval) {
		case intervals.INTERVALS_DAILY: return relativeDays
		case intervals.INTERVALS_MONTHLY: return relativeMonths
		case intervals.INTERVALS_YEARLY: return relativeYears
	}
}