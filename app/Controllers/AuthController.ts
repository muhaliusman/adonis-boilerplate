// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Login from 'App/Validators/LoginValidator'

export default class AuthController {
  public async login({ auth, request, response }) {
    const payload = await request.validate(Login)

    try {
      const token = await auth.use('api').attempt(payload.email, payload.password)
      return response.send(token)
    } catch {
      return response.status(401).send({
        message: 'Invalid credential',
      })
    }
  }
}
