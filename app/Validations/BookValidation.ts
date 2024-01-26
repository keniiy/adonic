import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class BookValidation {
  public async createOrUpdateBook(request: any) {
    const validationSchema = schema.create({
      name: schema.string({ trim: true }),
      pageNumbers: schema.number([rules.unsigned()]),
      authorId: schema.number([rules.exists({ table: 'authors', column: 'id' })]),
    })

    const validationMessages = {
      'name.string': 'Name is not a string !',
      'name.required': 'Name cannot be empty !',
      'pageNumbers.number': 'Page numbers must be a number !',
      'pageNumbers.required': 'Page numbers cannot be empty !',
      'authorId.number': 'Author ID must be a number !',
      'authorId.required': 'Author ID cannot be empty !',
      'authorId.exists': 'Author ID is not exists !',
    }

    let status, message, errorField

    try {
      await request.validate({ schema: validationSchema, messages: validationMessages })

      status = true
      message = 'Validation success !'
    } catch (err) {
      status = false
      message = err.messages.errors[0].message
      errorField = err.messages.errors[0].field
    }

    const result = {
      status: status,
      message: message,
      errorField: errorField,
    }

    return result
  }

  public async fetchBooks(request: any) {
    let status, message, errorField
    const validationSchema = schema.create({
      page: schema.number.optional([rules.range(1, Infinity)]),
      limit: schema.number.optional([rules.range(1, 100)]),
      name: schema.string.optional(),
      authorName: schema.string.optional(),
    })

    const validationMessages = {
      'page.range': 'Page number must be greater than 0',
      'limit.range': 'Page size must be between 1 and 100',

      'name.string': 'Name must be a string',
      'authorName.string': 'Author name must be a string',
    }

    try {
      await request.validate({ schema: validationSchema, messages: validationMessages })

      status = true
      message = 'Validation success !'
    } catch (err) {
      status = false
      message = err.messages.errors[0].message
      errorField = err.messages.errors[0].field
    }

    const result = {
      status: status,
      message: message,
      errorField: errorField,
    }

    return result
  }

  public async updateBook(request: any) {
    let status, message, errorField
    const validationSchema = schema.create({
      params: schema.object().members({
        id: schema.number([rules.exists({ table: 'books', column: 'id' })]),
      }),
      name: schema.string.optional(),
      pageNumbers: schema.number.optional([rules.unsigned()]),
      authorId: schema.number.optional([rules.exists({ table: 'authors', column: 'id' })]),
    })

    const validationMessages = {
      'name.string': 'Name is not a string !',
      'pageNumbers.number': 'Page numbers must be a number !',
      'authorId.number': 'Author ID must be a number !',
      'authorId.exists': 'Author ID is not exists !',
    }

    try {
      await request.validate({ schema: validationSchema, messages: validationMessages })

      status = true
      message = 'Validation success !'
    } catch (err) {
      status = false
      message = err.messages.errors[0].message
      errorField = err.messages.errors[0].field
    }

    const result = {
      status: status,
      message: message,
      errorField: errorField,
    }

    return result
  }

  public async deleteBook(request: any) {
    let status, message, errorField
    const validationSchema = schema.create({
      params: schema.object().members({
        id: schema.number([rules.exists({ table: 'books', column: 'id' })]),
      }),
    })

    const validationMessages = {
      'id.number': 'ID must be a number !',
      'id.exists': 'ID is not exists !',
    }

    try {
      await request.validate({ schema: validationSchema, messages: validationMessages })

      status = true
      message = 'Validation success !'
    } catch (err) {
      status = false
      message = err.messages.errors[0].message
      errorField = err.messages.errors[0].field
    }

    const result = {
      status: status,
      message: message,
      errorField: errorField,
    }

    return result
  }
}
