import { Router } from 'express'
import authMiddleware from '../middlewares/auth-middleware'
import adminMiddleware from '../middlewares/admin-middleware'
import CourseController from './course-controller'

const courseRoutes = Router()

courseRoutes.post('/courses/register',authMiddleware, CourseController.registerCourse)
courseRoutes.post('/courses/update/',authMiddleware, CourseController.updateCourse)

export default courseRoutes
