import { HttpService } from '@nestjs/axios';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { BotService } from 'src/bot/bot.service';
import { User } from 'src/common/entity/user.entity';

@Injectable()
export class WeatherService {
  constructor(
    private httpService: HttpService,
    @Inject(forwardRef(() => BotService))
    private botService: BotService,
  ) {}

  async getWeather(latitude: number, longitude: number): Promise<string> {
    const url = `${process.env.WEATHER_API}?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${process.env.WEATHER_KEY}&units=metric`;
    const responseData = await lastValueFrom(this.httpService.get(url));
    const currentDay = responseData.data.daily[0];
    const currentWeather = `Current Weather 
            \nOverall: ${currentDay.weather[0].main}

            Temperature 
            Day:${currentDay.temp.day}°C, Night:${currentDay.temp.night}°C

            Humidity: ${currentDay.humidity}%rh

            Wind: ${currentDay.wind_speed}m/s

            Cloudiness: ${currentDay.clouds}%
            `;

    return currentWeather;
  }

  async findUser(chatId: number): Promise<any> {
    return await this.botService.findOne(chatId);
  }
}
