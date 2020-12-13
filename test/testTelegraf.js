const Telegraf = require('telegraf')
const TelegrafTest = require('telegraf-test')

const bot = new Telegraf(process.env.TELEGRAM_KEY);
const test = new TelegrafTest({
    url: `http://127.0.0.1:${port}/${secretPath}`
})
 
test.setUser({
    id: 1234,
    username: '@TiagoEDGE'
    // ...//
})