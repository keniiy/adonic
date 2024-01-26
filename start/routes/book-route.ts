import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/books', 'BookController.create').as('createBook')
  Route.get('/books', 'BookController.index').as('getBooks')
  Route.put('/books/:id', 'BookController.update').as('updateBook')
  Route.delete('/books/:id', 'BookController.delete').as('deleteBook')
})
  .prefix('/api')
  .middleware('auth')

export default Route
