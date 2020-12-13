require('dotenv').config();

const mongoose = require('mongoose');
const Telegraf= require('telegraf'); 
const Extra = require('telegraf/extra');

const apiDB = require('./apiDB');
const apiNeuralNet = require('./apiNeuralNet');
const bot = new Telegraf(process.env.TELEGRAM_KEY);

async function bootstrap() {
	await apiDB.dbConnection();
	//await bot.telegram.setWebhook(`${config.bot.webHook}`);
	return bot.launch();
	//return app.listen(`${config.server.port}`);
}

bootstrap().then(()=>console.log('Bot Started'));

bot.hears(/ping/i, ctx => {
    ctx.reply('Pong!')
})
//bot.use(Telegraf.log());  
// bot.start((ctx) => {
// 	ctx.telegram.getChatMember(chatId, userId).then((arg) => ctx.reply(arg));
	

// });
//await bot.telegram.getFileLink(fileId);//link
//--------Инфа проо пермишены у бота
// ctx.getChat(ctx.message.chat.id).then((resp) =>{	
// console.log(resp);
// });
bot.on('photo', async (ctx) => {
	const {photo} = ctx.message;
	const fileId = photo[photo.length-1].file_id;
	const fileLink = await bot.telegram.getFileLink(fileId);
	if(await apiNeuralNet.isNude(fileLink)){		
		apiDB.addReportUser(ctx.message.from.id);
		const admins = await getAdminsList(ctx);
		
		//console.log(ctx.message); 
		ctx.reply(getReportMessage(admins),Extra.HTML())
	}		
});

bot.on('inline_query', (ctx) => {
  const result = []
  // Explicit usage
  ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

  // Using context shortcut
  ctx.answerInlineQuery(result)
})

const getAdminsList = async (ctx) => {
	let admins = [];
	await ctx.getChatAdministrators(ctx.message.chat.id).then((allAdminsWithPerm) =>{	
		allAdminsWithPerm.forEach((admin) =>{
			if(!admin.user.is_bot){
				admins.push(admin);
				//console.log(admin.user.first_name + ' ' + admin.user.last_name);
			}
		});
	});
	return admins
}
const getReportMessage = (admins) => {
	let message =`❗CFNM Content❗ \n`;
	admins.forEach(admin => {
		if(!admin.user.hasOwnProperty('first_name')) 
			admin.user.first_name = '';
		if(!admin.user.hasOwnProperty('last_name')) {
			admin.user.last_name = '';
		}
		const name = admin.user.first_name + admin.user.last_name;
		message += `<a href="tg://user?id=${admin.user.id}">${name}</a> `
	});
	return message;
}