import { Update, Help } from 'nestjs-telegraf';

@Update()
export class HelpUpdate {
  @Help()
  help(ctx: any) {
    ctx.reply(
      'Welcome to the bot, this bot provides weather forecast at your location every day at chosen time. Bot works with 24:00 time format. For bot to work it needs time and location. \nBot commands: /start, /help, /time /stop',
    );
  }
}
