// app/Services/BookService.ts

import Book from 'App/Models/Book'

export default class BookService {
  public async createBook(request: any) {
    try {
      const { name, pageNumbers, authorId } = request.all()

      const book = await Book.create({
        name,
        pageNumbers,
        authorId,
      })

      return {
        status: true,
        message: 'Book created successfully',
        data: book,
      }
    } catch (error) {
      return {
        status: true,
        message: 'Book creation failed',
      }
    }
  }

  public async fetchBooks(request: any) {
    try {
      const { page = 1, limit = 10, name, authorName } = request.all()

      const validPage = parseInt(page, 10)
      const validLimit = parseInt(limit, 10)

      if (isNaN(validPage) || isNaN(validLimit)) {
        return {
          status: false,
          message: 'Invalid page or limit value. Please provide valid integers.',
        }
      }

      const query = await Book.query()
        .if(name, (q) => {
          q.where('name', 'ILIKE', `%${name}%`)
        })
        .if(authorName, (q) => {
          q.whereHas('author', (builder) => {
            builder.where('name', 'ILIKE', `%${authorName}%`)
          })
        })
        .paginate(page, limit)

      return {
        status: true,
        message: 'Books fetched successfully',
        data: query,
      }
    } catch (error) {
      console.log(error.message)

      return {
        status: true,
        message: 'Failed to fetch books',
      }
    }
  }

  public async updateBook(id: number, request: any) {
    try {
      const { name, pageNumbers, authorId } = request.all()

      const book = await Book.findOrFail(id)

      book.name = name
      book.pageNumbers = pageNumbers
      book.authorId = authorId

      await book.save()

      return {
        status: true,
        message: 'Book updated successfully',
        data: book,
      }
    } catch (error) {
      return {
        status: true,
        message: 'Failed to update book',
      }
    }
  }

  public async deleteBook(id: number) {
    try {
      const book = await Book.findOrFail(id)

      await book.delete()

      return {
        status: true,
        message: 'Book deleted successfully',
      }
    } catch (error) {
      return {
        status: true,
        message: 'Failed to delete book',
      }
    }
  }
}
