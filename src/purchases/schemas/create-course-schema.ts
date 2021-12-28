import { Schema, model, Document } from 'mongoose';


export class Teacher{
 id:"string"
 name:"string"
}

export class students{
    id:"string"
}

interface CourseInterface extends Document {
    name?: string
    duration?: string
    description?: string
    theme?: string
    teacher?: Array<Teacher>
    sales?: number
}


const CourseSchema = new Schema({
    name: {
        type: 'string',
        required: true
    },
    duration: {
        type: 'string',
        required: true,
    },
    description: {
        type: 'string',
        required: true
    },
    theme: {
        type: 'string',
        required: true,
        default: 'without description'
    },
    teacher: {
        id:{
            type: 'string',
        },
        name:{
            type: 'string',
        }
    },
    sales: {
        type: 'number',
        default: 0
       
    },
})
export default model<CourseInterface>('Course', CourseSchema)