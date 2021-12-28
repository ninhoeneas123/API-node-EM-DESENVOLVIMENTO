import { Request, Response } from 'express'
import Course from '../schemas/create-course-schema'
import CasesCoursesDataBase from '../database-cases/courses-database-cases'


class CoursesCases {

    async caseCreateCourse(data: any) {
        const newCourse = data
        let statusReturn

        const valityCourse = await CasesCoursesDataBase.findOneCourse(newCourse.name)
        console.log(valityCourse)
        if (valityCourse) {
            statusReturn = {
                code: 400,
                return: { message: "Já existe um curso com esse nome" }
            }
            return statusReturn
        }
        await CasesCoursesDataBase.createCourse(newCourse)

        statusReturn = {
            code: 201,
            return: { message: "Curso cadastrado com suceso" }
        }
        return statusReturn
    }
    async findCourses(data: any) {
        let resultQuery
        let returnStatus
        const courseData = data
        if (courseData.courseName) {
            const name = courseData.courseName as string
            resultQuery = await CasesCoursesDataBase.findCourses(name)

            if (resultQuery.length === 0) {
                returnStatus = {
                    code: 200,
                    return: { countResult: resultQuery.length, result: [] }
                }
                return returnStatus
            }
            returnStatus = {
                code: 200,
                return: { countResult: resultQuery.length, result: resultQuery }
            }
            return returnStatus;
        }
        resultQuery = await Course.find()
        returnStatus = {
            code: 200,
            return: { countResult: resultQuery.length, result: resultQuery }
        }
        return returnStatus;
    }

    async updateCourse(data: any, id: string) {
        const updateCourse = data
        const idCourse = id
        let returnStatus

        await CasesCoursesDataBase.updateCourse(data, id)
        returnStatus = {
            code: 200,
            return: { message: "Curso modificado com sucesso" }
        }
        return returnStatus
    }
    async deleteCourse(id: string) {
        const idCourse = id
        let returnStatus

        await CasesCoursesDataBase.deleteCourse(id)
        returnStatus = {
            code: 200,
            return: { message: "curso removido com sucesso" }
        }
        return returnStatus
    }
}
export default new CoursesCases()

