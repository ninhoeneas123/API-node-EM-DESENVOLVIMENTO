import { Router } from 'express'

import userController from './user-controller'
import authMiddleware from '../middlewares/auth-middleware'
import adminMiddleware from '../middlewares/admin-middleware'


const userRouter = Router()

userRouter.get('/users/find', authMiddleware, adminMiddleware, userController.findUsers)
userRouter.post('/users/register', userController.registerUser)
userRouter.post('/users/forgot-password', userController.forgotPassword)
userRouter.post('/users/recovery-password', userController.passwordRecovery)
userRouter.post('/users/new-password', authMiddleware, userController.newPassword)
userRouter.delete('/users/delete/:id', authMiddleware,adminMiddleware, userController.deleteUser)
userRouter.put('/users/update', authMiddleware, userController.updateUser)
userRouter.put('/users/update-address', authMiddleware, userController.updateUserAddress)



export default userRouter