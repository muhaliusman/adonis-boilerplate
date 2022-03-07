import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        name: 'administrator',
        email: 'administrator@mail.com',
        password: 'secret',
      },
      {
        name: 'investor',
        email: 'investor@email.com',
        password: 'supersecret'
      }
    ])
  }
}