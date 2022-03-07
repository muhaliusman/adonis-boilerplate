// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ auth, request, response }) {
    const email = request.input('email')
    const password = request.input('passwor')

    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
