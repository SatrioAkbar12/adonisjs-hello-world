import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async store({ request, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    return await auth.use('api').createToken(user)
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('api').invalidateToken()

    return response.status(200).send({
      status: 'success',
      message: 'Successfully log out.'
    })
  }
}
