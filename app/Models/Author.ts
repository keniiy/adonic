import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, computed } from '@ioc:Adonis/Lucid/Orm'
import Book from 'App/Models/Book'

export default class Author extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasMany(() => Book)
  public books: HasMany<typeof Book>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @computed()
  public get numberOfBooks() {
    return this.books.length || 0
  }
}
