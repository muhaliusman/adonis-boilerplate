import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import Login from 'App/Validators/LoginValidator'

export default class AuthController {
  public async login({ auth, request, response }) {
    const payload = await request.validate(Login)

    try {
      const user = await User.findBy('email', payload.email)

      if (!user || !(await Hash.verify(user.password, payload.password))) {
        return response.status(401).send({
          message: 'Invalid credential',
        })
      }

      if (user.disabled) {
        return response.status(401).send({
          message: 'Your account has been disabled',
        })
      }

      const token = await auth.use('api').generate(user, {
        expiresIn: '7days',
      })

      return response.send({ ...token.toJSON(), ...{ user: user.serialize() } })
    } catch {
      return response.status(500).send({
        message: 'Internal server error',
      })
    }
  }
}
