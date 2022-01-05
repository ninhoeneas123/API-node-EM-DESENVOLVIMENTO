import { Schema, model, Document } from 'mongoose';


export class Client {
    id: "string"
    name: "string"
}

interface PurchasesInterface extends Document {
    purchaseNumber?: number
    products?: Array<any>
    amount?: string
    status?: string
    client?: Array<Client>
    typePayment?: string
}

const purchasesSchema = new Schema({
    purchaseNumber: {
        type: 'number',
    },
    products: {},
    amount: {
        type: 'number',
        default: 0,
    },
    status: {
        type: 'string',
        default:'aberto'
    },
    client: {
        id: {
            type: 'string',
        },
        name: {
            type: 'string',
        }
    },
    typePayment: {
        type: 'string',
    },
})
export default model<PurchasesInterface>('Purchase', purchasesSchema)