import User from 'App/Models/User'

export default class UsersController {
  public async index({ request, response }) {
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
}
