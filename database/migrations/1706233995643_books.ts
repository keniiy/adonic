import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BooksSchema extends BaseSchema {
  protected tableName = 'books'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.integer('page_numbers').unsigned().notNullable()
      table.integer('author_id').unsigned().references('id').inTable('authors')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
