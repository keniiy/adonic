import BookService from 'App/Services/BookService'
import BookValidation from 'App/Validations/BookValidation'
import formatResponse from 'App/Traits/FormatResponse'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const bookValidation = new BookValidation()
const bookService = new BookService()

export default class BookController {
  public async create({ request, response }: HttpContextContract) {
    const validateData = await bookValidation.createOrUpdateBook(request)

    if (!validateData.status) return formatResponse(validateData, response)

    const result = await bookService.createBook(request)
    return formatResponse(result, response)
  }

  public async index({ request, response }: HttpContextContract) {
    const validateData = await bookValidation.fetchBooks(request)

    if (!validateData.status) return formatResponse(validateData, response)

    const result = await bookService.fetchBooks(request)
    return formatResponse(result, response)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const validateData = await bookValidation.updateBook(request)

    if (!validateData.status) return formatResponse(validateData, response)

    const result = await bookService.updateBook(params.id, request)
    return formatResponse(result, response)
  }

  public async delete({ request, response, params }: HttpContextContract) {
    const validateData = await bookValidation.deleteBook(request)

    if (!validateData.status) return formatResponse(validateData, response)

    const result = await bookService.deleteBook(params.id)
    return formatResponse(result, response)
  }
}
