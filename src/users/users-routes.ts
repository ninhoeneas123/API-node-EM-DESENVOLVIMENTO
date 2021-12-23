import { Router } from 'express'

import userController from './user-controller'
import authMiddleware from '../middlewares/auth-middleware'
import adminMiddleware from '../middlewares/admin-middleware'


const usersRouter = Router()

usersRouter.get('/users/find', userController.findUsers)
usersRouter.post('/users/register', userController.registerUser)
usersRouter.post('/users/forgot-password', userController.forgotPassword)
usersRouter.post('/users/recovery-password', userController.recoverPassword)
usersRouter.post('/users/new-password', authMiddleware, userController.newPassword)
usersRouter.delete('/users/delete/:id', authMiddleware,adminMiddleware, userController.deleteUser)
usersRouter.put('/users/update', authMiddleware, userController.updateUser)
usersRouter.put('/users/update-address', authMiddleware, userController.updateUserAddress)



export default usersRouter