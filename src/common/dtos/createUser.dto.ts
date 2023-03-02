import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  chatId: number;

  @IsString()
  user: string;

  @IsNumber()
  hour: number;

  @IsNumber()
  minutes: number;
}
