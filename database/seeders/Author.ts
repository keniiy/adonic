import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Author from 'App/Models/Author'

export default class AuthorSeeder extends BaseSeeder {
  public async run() {

    const existingAuthors = await Author.all();

    if (existingAuthors.length) 
      return;

    await Author.createMany([
      { name: 'Author One' },
      { name: 'Author Two' },
    ]);
  }
}
