import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotService } from './bot/bot.service';
import 'dotenv/config';
import { User } from './common/entity/user.entity';
import { BotModule } from './bot/bot.module';
import 'dotenv/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { WeatherService } from './weather/weather.service';
import { WeatherModule } from './weather/weather.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.URI,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [User],
      autoLoadEntities: true,
    }),
    ScheduleModule.forRoot(),
    WeatherModule,
    BotModule,
    TelegrafModule.forRoot({
      token: process.env.TOKEN,
    }),
    WeatherModule,
  ],
  providers: [BotService, WeatherService],
})
export class AppModule {}
