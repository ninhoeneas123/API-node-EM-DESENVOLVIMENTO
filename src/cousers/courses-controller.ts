import { Request, Response } from 'express'
import Course from './schemas/create-course-schema'
import User from '../users/schemas/users-schema'



class CourseController {

    public async allCourses(req: Request, res: Response): Promise<Response> {
        const query = req.query
        let result
        if (query.name) {
            const name = query.name as string
             result = await Course.find({ name: {"$regex": `${name}`, "$options": "i"}})

            if (result.length === 0) {

                return res.status(200).send({ result: result.length, message: "Nenhum curso encontrado" })

            }
            return res.status(200).send({ result: result.length, courses: result })
        }
         result = await Course.find()


        return res.json({ message: "users create" })
    }
    public async registerCourse(req: Request, res: Response): Promise<any> {
        const userId = req.userId
        const data = req.body

        const userData = await User.findOne({ id: userId })
        console.log(userData)

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

        await Course.create(newCourse)

        return res.status(200).send({ messagem: "Curso criado com sucesso." })


    }
    public async updateCourse(req: Request, res: Response): Promise<Response> {
        const data = req.body
        const query = req.query

        if (Object.keys(query).length === 0) {
            return res.status(400).send({ messagem: "Por favor selecione um curso" })
        }
        await Course.updateOne({ _id: query.idCourse }, {
            $set: {
                name: data.name,
                duration: data.duration,
                description: data.description,
                theme: data.theme
            }
        })
        return res.status(201).send({ messagem: "Curso editado com sucesso." })
    }
    public async deleteCourse(req: Request, res: Response){
        
    }
}

export default new CourseController();