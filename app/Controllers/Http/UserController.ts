import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserValidation from 'App/Validations/UserValidation'
const userValidation = new UserValidation()

import UserService from 'App/Services/UserService'
const userService = new UserService()

import formatResponse from "App/Traits/FormatResponse";


export default class UserController {
    public async register({ auth, request, response }: HttpContextContract) {
        const validatedData = await userValidation.register(request)

        if (!validatedData.status) 
            return formatResponse(validatedData, response)
        
        const result = await userService.register(auth, request)
        

        return formatResponse(result, response)
    }

    public async login({ auth, request, response }: HttpContextContract) {
        const validatedData = await userValidation.login(request)

        console.log(validatedData);
        

        if (!validatedData.status) {
            return formatResponse(validatedData, response)
        }

        const result = await userService.login(auth, request)

        return formatResponse(result, response)
    }

}
