/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import SessionController from '#controllers/session_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import UsersController from '#controllers/users_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/session', [SessionController, 'store']) // for login
router.delete('/session', [SessionController, 'destroy']).use(middleware.auth()) // for logout

router.get('/dashboard', async () => {
  return {
    status: 'success',
    message: 'You are authenticated.'
  }
})

router.resource('/users', UsersController).use(['index', 'show', 'update', 'destroy'], middleware.auth()).apiOnly()
