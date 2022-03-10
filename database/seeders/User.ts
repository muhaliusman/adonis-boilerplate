import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'administrator',
        email: 'administrator@mail.com',
        password: 'secret',
        role: 'administrator',
      },
      {
        name: 'investor',
        email: 'investor@email.com',
        password: 'supersecret',
        role: 'investor',
      },
      {
        name: 'manager',
        email: 'manager@email.com',
        password: 'supersecret',
        role: 'manager',
      },
    ])
  }
}
