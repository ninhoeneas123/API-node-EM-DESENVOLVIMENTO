import { Router } from 'express'

import UserController from './user-controller'
import authMiddleware from '../middlewares/auth-middleware'



const userRouter = Router()

userRouter.get('/users/find', authMiddleware, UserController.findUsers)
userRouter.post('/users/register',  UserController.registerUser)
userRouter.post('/users/forgot-password', UserController.forgotPassword)
userRouter.post('/users/recovery-password', UserController.passwordRecovery)
userRouter.post('/users/new-password', authMiddleware, UserController.newPassword)
userRouter.delete('/users/delete/:id', authMiddleware, UserController.deleteUser)
userRouter.put('/users/update', authMiddleware, UserController.updateUser)

export default userRouter