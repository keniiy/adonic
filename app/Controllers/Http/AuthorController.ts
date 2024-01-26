import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AuthorValidation from 'App/Validations/AuthorValidation'
const authorValidation = new AuthorValidation()

import AuthorService from 'App/Services/AuthorService'
const authorService = new AuthorService()

import formatResponse from 'App/Traits/FormatResponse'

export default class AuthorsController {
  public async create({ request, response }: HttpContextContract) {
    const validateData = await authorValidation.createAuthor(request)

    if (!validateData.status) return formatResponse(validateData, response)

    const result = await authorService.createAuthor(request)
    return formatResponse(result, response)
  }

  public async authors({ request, response }: HttpContextContract) {
    const validateData = await authorValidation.validateFetchAuthors(request)

    if (!validateData.status) return formatResponse(validateData, response)

    const result = await authorService.fetchAuthors(request)
    return formatResponse(result, response)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const authorValidation = new AuthorValidation()
    await authorValidation.updateAuthor(request)

    const authorService = new AuthorService()
    const result = await authorService.updateAuthor(params.id, request.all())

    return response.json(result)
  }

  public async delete({ response, params }: HttpContextContract) {
    const authorService = new AuthorService()
    const result = await authorService.deleteAuthor(params.id)

    return response.json(result)
  }
}
