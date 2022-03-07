export default class UsersController {
  public async index({ request, response }) {
    console.log(request.qs())

    response.status(401).send(request.qs())
  }
}
