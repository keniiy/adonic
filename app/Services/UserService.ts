import Hash from "@ioc:Adonis/Core/Hash";

import User from "App/Models/User";

export default class AuthService {
    public async register(auth: any, request: any) {
        let result: any 
        try {
            const req = request.all()

            const username = req.username.toLowerCase()
            const password = await Hash.make(req.password);

            let data: any = {
                username,
                password
            }

            const user = await User.create(data)
            console.log(user.id, 'user');
            

            data = await User.findBy('id', user.id);

            console.log(data, 'data');
            

            const token = await auth.use('api').generate(data, {
                expiresIn: '1day'
            })

         result = {
                status: true,
                message: 'User registered successfully',
                data: {
                    user,
                    token
                }
            }
        } catch (error) {
            console.log(error.message, 'error');
            
            result = {
                status: true,
                message: 'User registration failed',
            }
        }

        console.log(result, 'result');
        

        return result
    }

    public async login(auth: any, request: any) {
        let result: any 
        try {
            const req = request.all()

            const username = req.username.toLowerCase()
            const password = req.password

            const user = await User.findByOrFail('username', username)

            const isPasswordValid = await Hash.verify(user.password, password)

            if (!isPasswordValid) {
                return result = {
                    status: false,
                    message: 'Email or password is invalid',
                }
            }

            const token = await auth.use('api').generate(user, {
                expiresIn: '1day'
            })

             result = {
                status: true,
                message: 'User logged in successfully',
                data: {
                    user,
                    token
                }
            }
        } catch (error) {
            result = {
                status: true,
                message: 'User logged in failed',
            }
        }

        return result
    }

}
