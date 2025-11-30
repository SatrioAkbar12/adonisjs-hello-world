import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { messages } from '@vinejs/vine/defaults'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)

    try {
      const user = await User.create({
        fullName: payload.full_name,
        email: payload.email,
        password: payload.password,
      })

      return response.status(201).send({
        status: 'success',
        message: 'User created',
        data: user
      })
    }
    catch (error) {
      if( error.code === '23505' || error.code === 'ER_DUP_ENTRY') {
        return response.status(409).send({
          status: 'error',
          message: 'Email address is already exists'
        })
      }

      return response.status(500).send({
        status: 'error',
        message: error.message
      })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)

      return response.send({
        status: 'success',
        data: user
      })
    }
    catch (error) {
      if(error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({
          status: 'error',
          message: 'User not found',
        })
      }

      return response.internalServerError({
        status: 'error',
        message: error.message
      })
    }
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)

    const payload = await request.validateUsing(updateUserValidator)

    if(payload.full_name) user.fullName = payload.full_name
    if(payload.email) user.email = payload.email
    if(payload.password) user.password = payload.password

    await user.save()

    return response.send({
      status: 'success',
      message: 'User updated',
      data: user,
    })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return response.send({
      status: 'success',
      message: 'User deleted',
    })
  }
}
