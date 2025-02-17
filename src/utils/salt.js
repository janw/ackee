import crypto from 'node:crypto'
import schedule from 'node-schedule'

const generate = () => crypto.randomBytes(16).toString('hex')
let salt = generate()

// Generate a new salt every day
const rule = new schedule.RecurrenceRule()
rule.hour = 0

schedule.scheduleJob(rule, () => salt = generate())

export default () => salt