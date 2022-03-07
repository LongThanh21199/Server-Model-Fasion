import { Column, Entity } from "typeorm";
import TimestampedEntity from "./TimestampedEntity";

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}


@Entity()
export class User extends TimestampedEntity {

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  name: string

  @Column()
  birthday?: Date

  @Column()
  address?: string

  @Column()
  phone: number

  @Column('text')
  gender: Gender

}
