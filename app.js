const { Telegraf } = require('telegraf')

const tekon = '' // token bot 
const groupId = '' // grup id 
const welcomeMessage = 'Hi, this is some kind of welcome message' // welcomeMessage 
const messageAfter = "We'll get back to you as soon as we can" // Messege after client message

const bot = new Telegraf(tekon)

bot.start((ctx) => ctx.reply(welcomeMessage))

bot.on('text', (ctx) => {
    if (ctx.message.reply_to_message) {
        ctx.telegram.sendMessage(
            ctx.message.reply_to_message.text.split('User: ')[1].split(':')[0],
            ctx.message.text )
    } else {
        let message = 
            `User: ${ctx.message.chat.id}: \n\n${ctx.message.text}`
        ctx.telegram.sendMessage(ctx.message.chat.id, messageAfter)
        sendMessageInGroup(message)
    }
})

const sendMessageInGroup = (message) => bot.telegram.sendMessage(groupId, message)

bot.launch()