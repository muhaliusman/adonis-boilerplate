import User from 'App/Models/User'
import StoreUser from 'App/Validators/StoreUserValidator'
import UpdateUser from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async index({ request, response, bouncer }) {
    await bouncer.authorize('onlyAdmin')

    const page = request.input('page')
    const limit = request.input('limit')
    const search = request.input('search')

    const users = await User.query()
      .if(search, (query) =>
        query.where((q) => {
          q.where('name', 'like', `%${search}%`).orWhere('email', 'like', `%${search}%`)
        })
      )
      .paginate(page, limit)

    users.baseUrl('/users')

    return response.send(users)
  }

  public async show({ params, response, bouncer }) {
    const id = params.id
    const user = await User.findOrFail(id)

    await bouncer.authorize('showUpdateUser', user)

    return response.send(user)
  }

  public async store({ request, response, bouncer }) {
    await bouncer.authorize('onlyAdmin')

    const payload = await request.validate(StoreUser)

    const user = new User()
    user.email = payload.email
    user.name = payload.name
    user.password = payload.password
    user.role = payload.role
    await user.save()

    return response.status(201).send(user)
  }

  public async update({ request, response, params, bouncer }) {
    const payload = await request.validate(UpdateUser)
    const id = params.id

    const user = await User.findOrFail(id)
    await bouncer.authorize('showUpdateUser', user)
    await user.merge(payload).save()

    return response.send(user)
  }

  public async destroy({ response, params, bouncer }) {
    await bouncer.authorize('onlyAdmin')

    const id = params.id
    const user = await User.findOrFail(id)

    await user.delete()

    return response.send(user)
  }
}
