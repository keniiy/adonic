import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Book from 'App/Models/Book'

export default class BookSeeder extends BaseSeeder {
  public async run() {

    const existingBooks = await Book.all();

    if (existingBooks.length) 
      return;
    
    await Book.createMany([
      { name: 'Book One', pageNumbers: 300, authorId: 1 },
      { name: 'Book Two', pageNumbers: 250, authorId: 1 },
    ]);
  }
}
