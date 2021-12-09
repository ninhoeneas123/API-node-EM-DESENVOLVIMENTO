import { Schema, model, Document } from 'mongoose';


interface PasswordRecoveryInterface extends Document {
    user?: string
    code?: string
}

const PasswordRecoverySchema = new Schema({
    user: {
        type: 'string',
        required: true

    },
    code: {
        type: 'string',
        required: true
    },
 
})
export default model<PasswordRecoveryInterface>('PasswordRecovery', PasswordRecoverySchema)