import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotService } from './bot.service';
import { User } from '../common/entity/user.entity';
import { HelpUpdate } from './update/help.update';
import { StartUpdate } from './update/start.update';
import { TimeUpdate } from './update/time.update';
import { WeatherUpdate } from '../weather/update/weather.update';
import { WeatherService } from 'src/weather/weather.service';
import { WeatherModule } from 'src/weather/weather.module';
import { StopUpdate } from './update/stop.update';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => WeatherModule)],
  providers: [
    BotService,
    StartUpdate,
    HelpUpdate,
    WeatherUpdate,
    StopUpdate,
    TimeUpdate,
    WeatherService,
  ],
  exports: [TypeOrmModule, BotService],
})
export class BotModule {}
