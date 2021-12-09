import { Router } from 'express'

import CourseController from './course-controller'

const courseRoutes = Router()

courseRoutes.post('/course/register', CourseController.registerCourse)


export default courseRoutes
