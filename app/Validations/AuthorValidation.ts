// app/Validations/AuthorValidation.ts

import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthorValidation {
  public async createAuthor(request: any) {
    let status, message, errorField

    const validationSchema = schema.create({
      name: schema.string([
        rules.required(),
        rules.unique({ table: 'authors', column: 'name', caseInsensitive: true }),
      ]),
    })

    const validationMessages = {
      'name.string': 'Name is not a string !',
      'name.required': 'Name cannot be empty !',
      'name.unique': 'Name is not available already taken !',
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

  public async validateFetchAuthors(request: any) {
    let status, message, errorField
    const validationSchema = schema.create({
      page: schema.number.optional([rules.range(1, Infinity)]),
      pageSize: schema.number.optional([rules.range(1, 100)]),
      search: schema.string.optional(),
    })

    const validationMessages = {
      'page.range': 'Page number must be greater than 0',
      'pageSize.range': 'Page size must be between 1 and 100',
      'search.string': 'Search query must be a string',
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

  public async updateAuthor(request: any) {
    let status, message, errorField
    const validationSchema = schema.create({
      params: schema.object().members({
        id: schema.number([rules.exists({ table: 'authors', column: 'id' })]),
      }),
      name: schema.string.optional(),
    })

    const validationMessages = {
      'name.string': 'Name must be a string',
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

  public async deleteAuthor(request: any) {
    let status, message, errorField
    const validationSchema = schema.create({
      params: schema.object().members({
        id: schema.number([rules.exists({ table: 'authors', column: 'id' })]),
      }),
    })

    const validationMessages = {}

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
