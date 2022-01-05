import Purchase from '../schemas/create-purchase-schema'
import bcrypt from 'bcrypt'


class CasesPurchaseDataBase {

    async createNewPurchase(dataPurchase: any) {

        await Purchase.create(dataPurchase)

    }
    async findPurchaseForNumber(numberPurchase: any) {
        console.log(typeof numberPurchase)
        const purchase = await Purchase.findOne({ purchaseNumber: numberPurchase })
        return purchase
    }
    async findPurchaseForStatus(status: any) {
        const purchase = await Purchase.find({ status: status })
        return purchase
    }


}
export default new CasesPurchaseDataBase()