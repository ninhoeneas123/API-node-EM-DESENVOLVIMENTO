
import { Request, Response } from 'express'
import PurchasesCases from "./use-cases/purchase-use-case"


require('dotenv/config');

class UserController {

    async createPurchase(req: Request, res: Response): Promise<any> {
        const purchaseData = req.body
        const userId = req.userId

        const returnStatus = await PurchasesCases.caseCreatePurchase(purchaseData, userId)

        return res.status(returnStatus.code).send(returnStatus.return)

    }
    async findPurchase(req: Request, res: Response): Promise<any> {
        const queryData = req.query
        const queryType = req.body.queryType
        console.log(req.query)
        const returnStatus = await PurchasesCases.casefindPurchase(queryData, queryType)


        return res.status(returnStatus.code).send(returnStatus.return)
    }
    async findPurchaseForNumber(req: Request, res: Response): Promise<any> {
        const purchaseNumber = req.query.number
        const returnStatus = await PurchasesCases.casefindPurchaseForNumber(purchaseNumber)
        return res.status(returnStatus.code).send(returnStatus.return)
    }
    async findPurchaseForStatus(req: Request, res: Response): Promise<any> {
        const purchaseStatus = req.query.status
        const returnStatus = await PurchasesCases.casefindPurchaseForStatus(purchaseStatus)
        return res.status(returnStatus.code).send(returnStatus.return)
    }
}
export default new UserController();