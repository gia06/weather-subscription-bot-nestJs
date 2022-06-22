import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteUserDto } from 'src/common/dtos/deleteUser.dto';
import { UpdateUserDto } from 'src/common/dtos/updateUser.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../common/dtos/createUser.dto';
import { User } from '../common/entity/user.entity';

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(User) private botRepository: Repository<User>,
  ) {}

  async create(id: number, user: CreateUserDto | UpdateUserDto): Promise<User> {
    const savedUser = await this.botRepository.findOneBy({ chatId: id });

    if (savedUser) {
      savedUser.hour = user.hour;
      savedUser.minutes = user.minutes;
      savedUser.deleted = false;

      return await this.botRepository.save(savedUser);
    } else {
      const newUser = this.botRepository.create(user);
      return await this.botRepository.save(newUser);
    }
  }

  async findOne(chatId: number): Promise<User | string> {
    const user = await this.botRepository.findOneBy({ chatId, deleted: false });
    if (user) {
      return user;
    } else {
      return 'user doesnt exisst';
    }
  }

  async delete(chatId: number, toDelete: DeleteUserDto) {
    const user = await this.botRepository.findOneBy({ chatId });
    user.deleted = toDelete.deleted;
    return this.botRepository.save(user);
  }
}
