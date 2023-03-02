import { Update, Hears } from 'nestjs-telegraf';
import { BotService } from '../bot.service';

@Update()
export class StopUpdate {
  constructor(private botService: BotService) {}

  @Hears('/stop')
  async stopCron(ctx) {
    const stop = await this.botService.delete(ctx.chat.id, { deleted: true });
    await ctx.reply('Subscription cancelled');
  }
}
