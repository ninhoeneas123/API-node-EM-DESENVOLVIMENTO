import { Router } from 'express'
import authMiddleware from '../middlewares/auth-middleware'
import adminMiddleware from '../middlewares/admin-middleware'
import CourseController from './courses-controller'

const courseRoutes = Router()


courseRoutes.get('/courses/find', CourseController.findCourses)
courseRoutes.post('/courses/register', authMiddleware, CourseController.registerCourse)
courseRoutes.put('/courses/update-:id', authMiddleware, CourseController.updateCourse)
courseRoutes.delete('/courses/delete/:id', authMiddleware, CourseController.deleteCourse)

export default courseRoutes
