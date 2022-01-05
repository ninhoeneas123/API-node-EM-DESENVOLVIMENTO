import { Schema, model, Document } from 'mongoose';

export class Teacher {
    id: "string"
    name: "string"
}

interface CourseInterface extends Document {
    name?: string
    duration?: string
    description?: string
    theme?: string
    classes?: string
    teacher?: Array<Teacher>
    value?: number
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
    classes: {
        type: 'number',
        required: true,
        default: '0'
    },
    teacher: {
        id: {
            type: 'string',
        },
        name: {
            type: 'string',
        }
    },
    value: {
        type: 'number',
        default: 0
    },
    sales: {
        type: 'number',
        default: 0

    },
})
export default model<CourseInterface>('Course', CourseSchema)