import {Request, Response} from 'express'


class CourseController{

    public async index(req: Request, res:Response): Promise<Response> {
        //const users  = await User.find()
        return res.json({message: "users create"})
    }
    public async registerCourse(req: Request, res:Response): Promise<any> {
        const data = req.body
        console.log(data)
        return res.status(200).end("Curso registrado com sucesso.")


    }
}

export default new CourseController();