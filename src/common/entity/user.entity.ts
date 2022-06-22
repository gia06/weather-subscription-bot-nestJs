import { Logger } from '@nestjs/common';
import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  AfterInsert,
  UpdateDateColumn,
  AfterRemove,
} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: number;

  @Column()
  chatId: number;

  @Column()
  user: string;

  @Column()
  hour: number;

  @Column()
  minutes: number;

  @Column()
  deleted: boolean = false;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @AfterInsert()
  logInsert() {
    Logger.log(`User inserted with id:`, this.id);
  }

  @BeforeUpdate()
  logUpdate() {
    Logger.log(`User with id ${this.id} has been updated`);
  }

  @AfterRemove()
  logRemove() {
    Logger.log(`User removed with id:`, this.id);
  }
}
