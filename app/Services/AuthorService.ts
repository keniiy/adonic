import Author from 'App/Models/Author'

export default class AuthorService {
  public async createAuthor(request: any) {
    try {
      const authorData = request.only(['name'])

      const author = await Author.create(authorData)

      return { status: true, message: 'Author created successfully', data: author }
    } catch (error) {
      return { status: true, message: 'Author creation failed' }
    }
  }

  public async fetchAuthors(request: any) {
    try {
      const { page = 1, pageSize = 10, search = '' } = request.all()

      const authors = await Author.query()
        .select('authors.id', 'authors.name')
        .if(search, (query) => {
          query.where('name', 'ILIKE', `%${search}%`)
        })
        .preload('books')
        .paginate(page, pageSize)

      return { status: true, message: 'Authors fetched successfully', data: authors }
    } catch (error) {
      console.log(error.message)

      return { status: false, message: 'Failed to fetch authors' }
    }
  }

  public async updateAuthor(id: number, data: any) {
    try {
      const author = await Author.findOrFail(id)
      author.merge(data)
      await author.save()

      return { status: true, message: 'Author updated successfully', data: author }
    } catch (error) {
      return { status: true, message: 'Failed to update author' }
    }
  }

  public async deleteAuthor(id: number) {
    try {
      const author = await Author.findOrFail(id)
      await author.delete()

      return { status: true, message: 'Author deleted successfully' }
    } catch (error) {
      return { status: true, message: 'Failed to delete author' }
    }
  }
}
