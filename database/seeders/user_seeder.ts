import { UserFactory } from '#database/factories/user_factory'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await UserFactory.createMany(5)

    await User.create({
      fullName: 'Ryota Kizuna',
      email: 'ryota1@mail.com',
      password: 'Ryota123',
    })
  }
}
