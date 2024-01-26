import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const plainPassword = 'user1234'; // example password
    const hashedPassword = await Hash.make(plainPassword);

    const existingUser = await User.findBy('username', 'sampleuser');

    if (existingUser) 
      return;

    await User.create({
      username: 'sampleuser',
      password: hashedPassword,
    });
  }
}
