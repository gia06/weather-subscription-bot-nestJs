import { Update, Start } from 'nestjs-telegraf';

@Update()
export class StartUpdate {
  @Start()
  start(ctx: any) {
    ctx.reply(
      'Welcome to the bot, \nPlease send time in format: HH:MM \n(example: /time 12:00)',
    );
  }
}
