import { Request, Response } from 'express'
import Course from './schemas/create-course-schema'
import CasesUserDataBase from '../users/database-cases/users-database-cases'
import CoursesCases from './use-cases/courses-usecases'


class CourseController {

    public async findCourses(req: Request, res: Response): Promise<Response> {
        const query = req.query

        const statusReturn = await CoursesCases.findCourses(query)

        return res.status(statusReturn.code).send(statusReturn.return)
    }

    public async registerCourse(req: Request, res: Response): Promise<any> {
        const userId = req.userId
        const data = req.body

        const userData = await CasesUserDataBase.findUserForId(userId)
        const newCourse = {
            name: data.name,
            duration: data.duration,
            description: data.description,
            theme: data.theme,
            teacher: {
                id: userId,
                name: userData.name
            },
            sales: data.sales,
        }

        const statusReturn = await CoursesCases.caseCreateCourse(newCourse)

        return res.status(statusReturn.code).send(statusReturn.return)
    }
    public async updateCourse(req: Request, res: Response): Promise<Response> {
        const data = req.body
        const query = req.params
        const updateCourse = {
            name: data.name,
            duration: data.duration,
            description: data.description,
            theme: data.theme
        }
        const statusReturn = await CoursesCases.updateCourse(updateCourse, query.id)
        console.log(statusReturn)

        return res.status(statusReturn.code).send(statusReturn.return)
    }
    public async deleteCourse(req: Request, res: Response) {
        const params = req.params
       
        const statusReturn = await CoursesCases.deleteCourse(params.id)

        return res.status(statusReturn.code).send(statusReturn.return)
    }

}

export default new CourseController();