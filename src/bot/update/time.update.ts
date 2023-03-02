import { Logger } from '@nestjs/common';
import { Update, On } from 'nestjs-telegraf';
import { BotService } from '../bot.service';

@Update()
export class TimeUpdate {
  constructor(private botService: BotService) {}

  @On('message')
  async getTime(ctx: any) {
    try {
      const message = await ctx.message.text;
      const chatId = await ctx.message.chat.id;
      const user = await ctx.message.from.username;
      const chosenTime = message.split(' ')[1].split(':');

      if (chosenTime.length >= 2) {
        const hour = Number(chosenTime[0]);
        const minutes = Number(chosenTime[1]);
        Logger.log('hour:', hour, 'miuntes:', minutes);

        await this.botService.create(chatId, {
          chatId,
          user,
          hour,
          minutes,
        });
        await ctx.reply('Time saved. \nNow please send location');
      } else {
        ctx.reply('wrong time format');
      }
    } catch (err) {
      Logger.log(err);
      ctx.reply('wrong time format');
    }
  }
}
