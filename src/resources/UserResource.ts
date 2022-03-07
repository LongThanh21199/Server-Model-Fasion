import {User} from "../entity/User";

export default class UserResource {

  constructor(private readonly user: User) {
  }

  toJson() {
    return {
      id: this.user.id,
      email: this.user.email,
      name: this.user.name,
      birthday: this.user.birthday,
      address: this.user.address,
      phone: this.user.phone,
      createdAt: this.user.createdAt,
      updatedAt: this.user.updatedAt
    }
  }
}
