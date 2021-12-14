import { Schema, model, Document } from 'mongoose';

export class Address {
    'zipcode': string;
    'street': string;
    'district': string;
    'city': string;
    'state': string;
    'country': string;
}

interface UserInterface extends Document {
    name?: string
    email?: string
    password?: string
    address?: Array<Address>
    function?: string
    admin: boolean
}

const UserSchema = new Schema({
    name: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    password: {
        type: 'string',
        required: true
    },
    function:{
        type: 'string',
        required: true,
        default: 'aluno',
    },
    admin:{
        type: 'boolean',
        default: false,
    },
    address: {
        zipcode: {
            type: 'string',
            required: true
        },
        number:{
            type: 'string',
            required: true
        },
        street:{
            type: 'string',
            required: true
        },
        district:{
            type: 'string',
            required: true
        },
        city:{
            type: 'string',
            required: true
        },
        state:{
            type: 'string',
            required: true
        },
        country: {
            type: 'string',
            required:true,
        }
    }
})
export default model<UserInterface>('User', UserSchema)