
import { Router } from 'express'
import AuthController from './auth-controller';


const authRoutes = Router()


authRoutes.post('/login', AuthController.authUser)


export default authRoutes
