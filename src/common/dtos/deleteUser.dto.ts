import { IsBoolean } from 'class-validator';

export class DeleteUserDto {
  @IsBoolean()
  deleted: boolean;
}
