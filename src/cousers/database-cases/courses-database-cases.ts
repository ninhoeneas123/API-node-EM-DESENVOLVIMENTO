import bcrypt from 'bcrypt'
import Course from '../schemas/create-course-schema'


class CasesCoursesDataBase {

    async createCourse(data: object) {
        await Course.create(data)

    }

    async findOneCourse(name: string) {
        const course = await Course.findOne({ name: name })
        return course
    }

    async findCourses(name: string) {
        const courses = await Course.find({ name: { "$regex": `${name}`, "$options": "i" } })
        return courses
    }
    async findAllCourses() {
        const courses = await Course.find()
        return courses
    }
    async findCoursesForId(id: string) {
        const courses = await Course.find()
        return courses
    }
    async updateCourse(data: any, id: string) {
        await Course.updateOne({ _id: id }, { $set: { name: data.name, duration: data.duration, description: data.description, theme: data.theme } })
    }
    async deleteCourse(id: string) {
        await Course.deleteOne({ _id: id })
    }
}

export default new CasesCoursesDataBase()