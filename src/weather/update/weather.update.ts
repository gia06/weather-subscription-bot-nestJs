import { Update, On } from 'nestjs-telegraf';
import { WeatherService } from 'src/weather/weather.service';
import { Logger } from '@nestjs/common';
import { CronJob, CronTime } from 'cron';

@Update()
export class WeatherUpdate {
  constructor(private weatherService: WeatherService) {}

  @On('location')
  async getWeather(ctx: any) {
    try {
      // const user = await this.weatherService.findUser(ctx.chat.id);

      const job = new CronJob(
        '* * * * * * ',
        // `${user.minutes} ${user.hour} * * *`,
        async () => {
          try {
            const user = await this.weatherService.findUser(ctx.chat.id);
            job.setTime(new CronTime(`${user.minutes} ${user.hour} * * *`));
            job.addCallback(async () => {
              const result = await this.weatherService.getWeather(
                ctx.message.location.latitude,
                ctx.message.location.longitude,
              );
              Logger.log(result);
              await ctx.reply(result);
            });
          } catch (err) {}
        },
      );

      job.start();
    } catch (err) {
      Logger.log(err);
      ctx.reply('Incorrect time was sent. Please try again');
    }
  }
}
