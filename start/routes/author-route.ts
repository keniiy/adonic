import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/author', 'AuthorController.create').as('createAuthor')
  Route.get('/author', 'AuthorController.authors').as('getAuthors')
  Route.put('/author/:id', 'AuthorController.update').as('updateAuthor')
  Route.delete('/author/:id', 'AuthorController.delete').as('deleteAuthor')
})
  .prefix('/api')
  .middleware('auth')

export default Route
