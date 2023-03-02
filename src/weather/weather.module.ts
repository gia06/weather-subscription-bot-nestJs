import { HttpModule, HttpService } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { BotModule } from 'src/bot/bot.module';
import { WeatherService } from './weather.service';

@Module({
  imports: [forwardRef(() => BotModule), HttpModule],
  providers: [WeatherService],
  exports: [HttpModule, WeatherService],
})
export class WeatherModule {}
