import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsNumber()
  hour: number;

  @IsNotEmpty()
  @IsNumber()
  minutes: number;
}
